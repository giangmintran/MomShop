using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Product;
using MOMShop.Entites;
using MOMShop.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace MOMShop.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductServices _services;
        public ProductController(IProductServices services)
        {
            _services = services;
        }

        [HttpGet("find-all")]
        public List<Product> GetProducts()
        {
            try
            {
                var result = _services.GetProducts();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("add")]
        public Product AddProducts([FromBody] UpdateProductDto input)
        {
            try
            {
                var result = _services.AddProducts(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut("update")]
        public Product UpdateProducts([FromBody] UpdateProductDto input)
        {
            try
            {
                var result = _services.UpdateProducts(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public void DeleteProduct(int id)
        {
            try
            {
                _services.DeleteProducts(id);
                //return "OK";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("detail/{id}")]
        public Product FindById(int id)
        {
            try
            {
                var result = _services.FindById(id);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
