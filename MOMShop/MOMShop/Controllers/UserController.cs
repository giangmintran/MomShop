﻿using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Collection;
using MOMShop.Services.Interfaces;
using System.Collections.Generic;
using System;
using MOMShop.Dto.Users;

namespace MOMShop.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserServices _services;
        public UserController(IUserServices services)
        {
            _services = services;
        }
        [HttpPost("login")]
        public UserDto Login(LoginDto input)
        {
            try
            {
                var result = _services.Login(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("register")]
        public string Register([FromBody] RegisterDto input)
        {
            try
            {
                var result = _services.Register(input);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("find/{id}")]
        public UserDto Find(int id)
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
