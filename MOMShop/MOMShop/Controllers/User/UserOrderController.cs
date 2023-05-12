using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Cart;
using MOMShop.Dto.Order;
using MOMShop.Services.Interfaces.UserService;
using System;

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
        public OrderDto Create(OrderDto input)
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
    }
}
