﻿using AutoMapper;
using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces.UserService;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MOMShop.Services.Implements.UserProductService
{
    public class UserOrderService : IUserOrderService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserOrderService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public OrderDto Create(OrderDto order)
        {
            var insert = _mapper.Map<Order>(order);
            var result = _dbContext.Orders.Add(insert);
            _dbContext.SaveChanges();

            var orderCode = "HD" + result.Entity.Id.ToString("D6");
            result.Entity.OrderCode = orderCode;
            foreach (var item in order.OrderDetails)
            {
                var detail = _mapper.Map<OrderDetail>(item);
                detail.OrderId = result.Entity.Id;
            }
            _dbContext.SaveChanges();
            return order;
        }

        public List<ViewOrderDto> FindAll(FilterOrderDto input)
        {
            var orders = _dbContext.Orders.Where(e => e.CreatedBy == input.CustomerId && !e.Deleted 
                                                    && (input.Status == null || e.OrderStatus == input.Status) 
                                                    && (input.OrderCode == null || e.OrderCode == input.OrderCode)).ToList();
            var result = _mapper.Map<List<ViewOrderDto>>(orders);
            foreach (var item in result)
            {
                var orderDetail = _dbContext.OrderDetails.Where(e => e.OrderId == item.Id).ToList();
                item.Details = orderDetail;
            }
            return result;
        }
    }
}