using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Collection;
using MOMShop.Services.Interfaces;
using System.Collections.Generic;
using System;
using MOMShop.Dto.Customer;
using MOMShop.Dto.Users;

namespace MOMShop.Controllers
{
    [Route("api/user-account")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerServices _services;

        public CustomerController(ICustomerServices services)
        {
            _services = services;
        }

        [HttpGet("get-all")]
        public List<UserDto> GetAll([FromQuery] FilterCustomerDto input)
        {
            try
            {
                var result = _services.GetAll(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
