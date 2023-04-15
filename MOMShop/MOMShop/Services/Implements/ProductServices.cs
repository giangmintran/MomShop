using AutoMapper;
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

namespace MOMShop.Services.Implements
{
    public class ProductServices : IProductServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ProductServices(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;

        }

        public ProductDto AddProducts(UpdateProductDto input)
        {
            var productCode = input.Name.ToLower();
            productCode = System.Text.RegularExpressions.Regex.Replace(productCode, @"\p{IsCombiningDiacriticalMarks}+", string.Empty);
            var insert = _mapper.Map<Product>(input);
            insert.Code = productCode;
            var result = _dbContext.Products.Add(insert);
            _dbContext.SaveChanges();
            return _mapper.Map<ProductDto>(result.Entity);
        }

        public ProductDto UpdateProducts(UpdateProductDto input)
        {
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == input.Id);
            if(product == null)
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
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();

        }

        public ProductDto FindById(int id)
        {
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == id);
            if (product == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }
            var result = _mapper.Map<ProductDto>(product);
            var productDetail = _dbContext.ProductDetails.Where(e => e.ProductId == product.Id);
            result.ProductDetails = _mapper.Map<List<ProductDetailDto>>(productDetail);
            return result;
        }

        public Paging<ProductDto> GetProducts(FilterProductDto input)
        {
            var result = new Paging<ProductDto>();
            result.Items = new List<ProductDto>();

            var products = _dbContext.Products.Where(e => !e.Deleted && (input.Status == null || e.Status == input.Status)).ToList();

            foreach (var product in products)
            {
                var item = _mapper.Map<ProductDto>(product);
                result.Items.Add(item);
            }
            result.TotalItems = result.Items.Count;

            //result.Items = result.Items.Skip(input.Skip).Take(input.PageSize).ToList();
            return result;
        }


    }
}
