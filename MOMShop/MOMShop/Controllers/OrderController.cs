using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Order;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
using System;

namespace MOMShop.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderServices _services;
        private IOrderDetailServices _orderServices;
        public OrderController(IOrderServices services, IOrderDetailServices orderServices)
        {
            _services = services;
            _orderServices = orderServices;
        }

        [HttpGet("find-all")]
        public Paging<OrderDto> GetOrders([FromQuery] FilterOrderDto input)
        {
            try
            {
                var result = _services.GetAllOrder(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
