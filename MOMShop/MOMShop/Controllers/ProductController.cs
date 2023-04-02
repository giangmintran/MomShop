using Microsoft.AspNetCore.Mvc;
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
    }
}
