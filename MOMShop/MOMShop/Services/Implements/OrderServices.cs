using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOMShop.Dto.Order;
using MOMShop.Dto.Product;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
using MOMShop.Utils.HistoryUpdate;
using System.Collections.Generic;
using System.Linq;

namespace MOMShop.Services.Implements
{
    public class OrderServices : IOrderServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public OrderServices(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;

        }

        public OrderDto FindById(int id)
        {

            var order = _dbContext.Orders.FirstOrDefault(e => e.Id == id && !e.Deleted);
            if (order != null)
            {
                var result = _mapper.Map<OrderDto>(order);
                var orderDetail = _dbContext.OrderDetails.Where(e => e.OrderId == order.Id);
                result.OrderDetails = _mapper.Map<List<CreateOrderDetailDto>>(orderDetail);
                foreach (var item in result.OrderDetails)
                {
                    var product = _dbContext.Products.FirstOrDefault(e => e.Id == item.ProductId);
                    if (product != null)
                    {
                        item.Price = product.Price;
                        item.ProductCode = product.Code;
                        item.ProductName = product.Name;
                        var imageUrl = _dbContext.ProductImages.FirstOrDefault(e => e.ProductId == item.ProductId);
                        item.ImageUrl = imageUrl?.ImageUrl;
                    }
                }

                var events = _dbContext.HistoryUpdates.Where(e => e.Table == HistoryUpdateTable.ORDER && e.ReferId == order.Id);
                result.Events = _mapper.Map<List<Events>>(events);

                return result;
            }
            return null;
        }

        public List<OrderDto> GetAllOrder(FilterOrderDto input)
        {
            var result = new List<OrderDto>();

            var orders = _dbContext.Orders.Where(e => !e.Deleted && (input.Status == null || e.OrderStatus == input.Status)).ToList();

            result = _mapper.Map<List<OrderDto>>(orders);
            return result;
        }

        public void UpdateStatus(int id, int status)
        {
            var order = _dbContext.Orders.FirstOrDefault(e => e.Id == id && !e.Deleted);
            if(order != null)
            {
                order.OrderStatus = status;
            }
            string summary = null;
            if (status == OrderStatus.DA_NHAN)
            {
                summary = "Đơn hàng đã được tiếp nhận";
            } else if (status == OrderStatus.DA_GIAO)
            {
                summary = "Đơn hàng đang được vận chuyển";
            }
            else if (status == OrderStatus.HOAN_THANH)
            {
                summary = "Đơn hàng được hoàn thành";
            }
            else if (status == OrderStatus.DA_HUY)
            {
                summary = "Hủy đơn hàng";
            }
            var history = new HistoryUpdate()
            {
                Table = HistoryUpdateTable.ORDER,
                ReferId = order.Id,
                Summary = summary
            };
            _dbContext.HistoryUpdates.Add(history);
            _dbContext.SaveChanges();   
        }
    }
}
