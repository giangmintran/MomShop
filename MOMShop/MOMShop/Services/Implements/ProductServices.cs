using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Product;
using MOMShop.Dto.ProductDetail;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
using MOMShop.Utils.HistoryUpdate;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Web;

namespace MOMShop.Services.Implements
{
    public class ProductServices : IProductServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProductServices(ApplicationDbContext dbContext, IMapper mapper, IWebHostEnvironment hostEnvironment)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
        }

        public ProductDto AddProducts(UpdateProductDto input)
        {
            //var productCode = input.Name.ToLower();
            //productCode = System.Text.RegularExpressions.Regex.Replace(productCode, @"\p{IsCombiningDiacriticalMarks}+", string.Empty);
            var insert = _mapper.Map<Product>(input);
            //insert.Code = productCode;
            var result = _dbContext.Products.Add(insert);
            _dbContext.SaveChanges();
            return _mapper.Map<ProductDto>(result.Entity);
        }

        public ProductDto UpdateProducts(UpdateProductDto input)
        {
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == input.Id);
            if (product == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }

            _dbContext.HistoryUpdates.Add(new HistoryUpdate()
            {
                Table = HistoryUpdateTable.PRODUCT,
                ReferId = product.Id,
                ColumnUpdate = HistoryUpdateColumn.PRODUCT_PRICE,
                OldValue = product.Price.ToString(),
                NewValue = input.Price.ToString()
            });

            product.Name = input.Name;
            product.Code = input.Code;
            product.Status = input.Status;
            product.Description = input.Description;
            product.ProductType = input.ProductType;

            _dbContext.SaveChanges();
            return _mapper.Map<ProductDto>(product);
        }

        public void DeleteProducts(int id)
        {
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == id);
            if (product == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }
            var productDetail = _dbContext.ProductDetails.Where(e => e.ProductId == id);
            if (productDetail.Any())
            {
                _dbContext.ProductDetails.RemoveRange(productDetail);
            }
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
        }

        public List<ProductDetailDto> Details(int id)
        {
            var productDetail = _dbContext.ProductDetails.Where(e => e.ProductId == id);
            return _mapper.Map<List<ProductDetailDto>>(productDetail);
        }

        public ProductDto FindById(int id)
        {
            var result = new ProductDto();
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == id && !e.Deleted);
            var productDetails = _dbContext.ProductDetails.Where(e => e.ProductId == product.Id).ToList();
            result = _mapper.Map<ProductDto>(product);
            result.ProductDetails = _mapper.Map<List<ProductDetailDto>>(productDetails);
            var image = _dbContext.ProductImages.FirstOrDefault(e => e.ProductId == id);
            if (image != null)
            {
                result.ImageUrl = image.ImageUrl;
            }
            return result;
        }

        public Paging<ProductDto> GetProducts(FilterProductDto input)
        {
            var result = new Paging<ProductDto>();
            result.Items = new List<ProductDto>();

            var products = _dbContext.Products.Where(e => !e.Deleted && (input.Status == null || e.Status == input.Status)).OrderByDescending(e => e.Id).ToList();

            foreach (var product in products)
            {
                var item = _mapper.Map<ProductDto>(product);
                var productDetails = _dbContext.ProductDetails.Where(e => e.ProductId == product.Id).ToList();
                item.ProductDetails = _mapper.Map<List<ProductDetailDto>>(productDetails);
                result.Items.Add(item);
                var image = _dbContext.ProductImages.FirstOrDefault(e => e.ProductId == item.Id);
                if(image != null)
                {
                    item.ImageUrl = image.ImageUrl;
                }
            }
            result.TotalItems = result.Items.Count;

            //result.Items = result.Items.Skip(input.Skip).Take(input.PageSize).ToList();
            return result;
        }

        public void AddProductImage(IFormFile input, int productId)
        {
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == productId);
            if(product != null)
            {
                var productImage = _dbContext.ProductImages.Where(e => e.ProductId == product.Id);
                foreach (var item in productImage)
                {

                }
            }

            if (input != null)
            {
                var baseDir = Directory.GetParent(Directory.GetParent(_hostEnvironment.ContentRootPath).FullName).FullName;
                string folderPath = Path.Combine(baseDir + $"\\MOMShop\\images\\{product.Code}");
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                string fileName = input.FileName;

                string filePath = Path.Combine(baseDir + $"\\MOMShop\\images\\{product.Code}", fileName);

                var endpoint = $"api/file/get?folder={product.Code}&fileName={fileName}";

                using (var filestream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    input.CopyTo(filestream);
                }

                var data = new ProductImage()
                {
                    ProductId = productId,
                    ImageUrl = endpoint
                };

                _dbContext.ProductImages.Add(data);
                _dbContext.SaveChanges();
            }
        }
    }
}
