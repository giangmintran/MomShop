using AutoMapper;
using Microsoft.AspNetCore.Components.Forms;
using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces.UserService;
using MOMShop.Utils.HistoryUpdate;
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

        public Order Create(OrderDto order)
        {
            order.CreatedDate = DateTime.Now;
            order.IntendedTime = DateTime.Now.AddDays(3);
            var insert = _mapper.Map<Order>(order);
            var result = _dbContext.Orders.Add(insert);
            _dbContext.SaveChanges();

            var orderCode = "HD" + result.Entity.Id.ToString("D6");
            result.Entity.OrderCode = orderCode;
            foreach (var item in order.OrderDetails)
            {
                var detail = _mapper.Map<OrderDetail>(item);
                detail.OrderId = result.Entity.Id;
                _dbContext.OrderDetails.Add(detail);
            }
            _dbContext.SaveChanges();

            foreach (var item in order.OrderDetails)
            {
                var cart = _dbContext.Carts.FirstOrDefault(e => e.ProductId == item.ProductId && e.CustomerId == order.CreatedBy);
                if (cart != null)
                {
                    _dbContext.Carts.Remove(cart);
                }
            }

            var history = new HistoryUpdate()
            {
                Table = HistoryUpdateTable.ORDER,
                ReferId = result.Entity.Id,
                Summary = "Thêm mới đơn hàng"
            };
            _dbContext.HistoryUpdates.Add(history);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public List<ViewOrderDto> FindAll(FilterOrderDto input)
        {
            input.CustomerId = 4;
            var orders = _dbContext.Orders.Where(e => e.CreatedBy == input.CustomerId && !e.Deleted
                                                    && (input.Status == null || e.OrderStatus == input.Status) 
                                                    && (input.OrderCode == null || e.OrderCode.Contains(input.OrderCode))).ToList();
            var result = _mapper.Map<List<ViewOrderDto>>(orders);
            foreach (var item in result)
            {
                var orderDetail = _dbContext.OrderDetails.Where(e => e.OrderId == item.Id).ToList();
                item.Details = _mapper.Map<List<ViewOrderDetail>>(orderDetail);
                foreach (var detail in item.Details)
                {
                    var product = _dbContext.Products.FirstOrDefault(e => e.Id == detail.ProductId && !e.Deleted);
                    if (product != null)
                    {
                        detail.Name = product.Name;
                        detail.Price = product.Price;
                        var productImage = _dbContext.ProductImages.FirstOrDefault(e => e.ProductId == product.Id);
                        detail.ImageUrl = productImage?.ImageUrl;
                        detail.Total = detail.Price * detail.Quantity;
                    }
                }
            }

            if (input.Keyword != null)
            {
                result = result.Where(e => e.Details.Where(detail => detail.Name.Contains(input.Keyword)).Any()).ToList();
            }

            return result;
        }

        public OrderDto FindById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateStatus(int id, int status)
        {
            var order = _dbContext.Orders.FirstOrDefault(e => e.Id == id && !e.Deleted);
            if (order != null)
            {
                order.OrderStatus = status;
            }
            _dbContext.SaveChanges();
        }
    }
}
