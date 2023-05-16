using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Cart;
using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using MOMShop.Entites;
using MOMShop.Services.Interfaces.UserService;
using System;
using System.Collections.Generic;

namespace MOMShop.Controllers.User
{
    [Route("api/user/order")]
    [ApiController]
    public class UserOrderController : ControllerBase
    {
        private IUserOrderService _services;
        public UserOrderController(IUserOrderService services)
        {
            _services = services;
        }

        [HttpPost("add")]
        public Order Create(OrderDto input)
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

        [HttpGet("get")]
        public List<ViewOrderDto> GetAllByUser([FromQuery] FilterOrderDto input)
        {
            try
            {
                var result = _services.FindAll(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
