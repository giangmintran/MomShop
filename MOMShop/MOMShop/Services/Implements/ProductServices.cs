using AutoMapper;
using MOMShop.Dto.Product;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using System.Collections.Generic;
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

        public Product AddProducts(UpdateProductDto input)
        {
            var productCode = input.Name.ToLower();
            var insert = _mapper.Map<Product>(input);
            insert.Code = productCode;
            var result = _dbContext.Products.Add(insert);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public Product UpdateProducts(UpdateProductDto input)
        {
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == input.Id);
            if(product == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }
            product.Name = input.Name;
            product.Price = input.Price;
            product.Status = input.Status;
            product.Description = input.Description;
            _dbContext.SaveChanges();
            return product;
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

        public Product FindById(int id)
        {
            var product = _dbContext.Products.FirstOrDefault(e => e.Id == id);
            if (product == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }
            return product;
        }

        public List<Product> GetProducts()
        {
            var result = _dbContext.Products.Where(e => e.Status == 1 || e.Status == 2).ToList();
            return result;
        }
    }
}
