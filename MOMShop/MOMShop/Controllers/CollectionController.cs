using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Product;
using MOMShop.Dto.ProductDetail;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
using System.Collections.Generic;
using System;
using MOMShop.Entites;
using MOMShop.Dto.Collection;

namespace MOMShop.Controllers
{
    [Route("api/collection")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private ICollectionService _services;

        public CollectionController(ICollectionService services)
        {
            _services = services;
        }

        [HttpGet("find-all")]
        public List<CollectionDto> GetAll()
        {
            try
            {
                var result = _services.FindAll();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("add")]
        public CollectionDto Create([FromBody] CollectionDto input)
        {
            try
            {
                var result = _services.Create(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut("update")]
        public CollectionDto Update([FromBody] CollectionDto input)
        {
            try
            {
                var result = _services.Update(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public void Delete(int id)
        {
            try
            {
                _services.Delete(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet("detail/{id}")]
        public CollectionDto Details(int id)
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
