using MOMShop.Services.Interfaces.UserService;
using MOMShop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Product;
using System.Collections.Generic;
using System;
using MOMShop.Dto.Cart;

namespace MOMShop.Controllers.User
{

    [Route("api/user/cart")]
    [ApiController]
    public class UserCartController : ControllerBase
    {
        private IUserCartService _services;
        public UserCartController(IUserCartService services)
        {
            _services = services;
        }

        [HttpGet("get-all")]
        public List<ViewCartDto> GetAll(int? customerId)
        {
            try
            {
                var result = _services.GetAll(customerId);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("add")]
        public CartDto Create(CartDto input)
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

        [HttpDelete("delete")]
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
