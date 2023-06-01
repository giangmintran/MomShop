﻿using Microsoft.AspNetCore.Mvc;
using MOMShop.Dto.Cart;
using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using MOMShop.Entites;
using MOMShop.Services.Interfaces.UserService;
using MOMShop.Utils;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        [HttpPost("send-mail")]
        public Task SendMail()
        {
            try
            {
                var result = _services.SendMail();
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

        [HttpPut("cancel-order/{id}")]
        public void CancelOrder(int id)
        {
            try
            {
                 _services.UpdateStatus(id, OrderStatus.DA_HUY);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
