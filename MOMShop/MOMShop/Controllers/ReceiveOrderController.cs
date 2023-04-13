using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Product;
using MOMShop.Dto.ReceiveOrder;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
using System;

namespace MOMShop.Controllers
{
    [Route("api/receive-order")]
    [ApiController]
    public class ReceiveOrderController : ControllerBase
    {
        private IReceiveOrderServices _services;
        private IProductDetailServices _productDetailServices;
        public ReceiveOrderController(IReceiveOrderServices services, IProductDetailServices productDetailServices)
        {
            _services = services;
            _productDetailServices = productDetailServices;
        }

        [HttpGet("find-all")]
        public Paging<ReceiveOrderDto> GetProducts([FromQuery] FilterReceiveOrderDto input)
        {
            try
            {
                var result = _services.GetReceiveOrders(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("add")]
        public ReceiveOrderDto Add([FromBody] CreateReceiveOrderDto input)
        {
            try
            {
                var result = _services.Add(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut("update")]
        public ReceiveOrderDto Update([FromBody] CreateReceiveOrderDto input)
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
    }
}
