using Microsoft.AspNetCore.Mvc;
using MOMShop.Entites;
using MOMShop.Services.Interfaces;
using System;

namespace MOMShop.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserServices _userServices;

        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }
        [HttpGet("find-all")]
        public User Login()
        {
            try
            {
                var result = _userServices.Login();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
