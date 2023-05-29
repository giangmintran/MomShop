using AutoMapper;
using MOMShop.Dto.Dashboard;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

namespace MOMShop.Services.Implements
{
    public class DashboardService : IDashboardService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public DashboardService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public DashboardDto Info()
        {
            var result = new DashboardDto();
            result.Orders = Enumerable.Repeat(0f, 12).ToList();
            result.ReceivedOrders = Enumerable.Repeat(0f, 12).ToList();
            var order = _dbContext.Orders.Where(e => !e.Deleted && e.CreatedDate.Year == DateTime.Now.Year).ToList().GroupBy(o => new { o.CreatedDate.Year, o.CreatedDate.Month }).Select(g => new
            {
                Month = g.Key.Month,
                TotalAmount = g.Sum(o => o.TotalAmount)
            })
            .OrderBy(m => m.Month)
            .ToList();

            foreach (var item in order)
            {
                result.Orders[item.Month - 1] = item.TotalAmount/10000;
            }

            var recOrder = _dbContext.ReceiveOrders.Where(e => !e.Deleted && e.CreatedDate.Year == DateTime.Now.Year);
            var queryOrder = from rOrderDetail in _dbContext.ReceiveOrderDetails
                             join rOrder in recOrder on rOrderDetail.ReceiveOrderId equals rOrder.Id
                             select new
                             {
                                 rOrder.CreatedDate.Month,
                                 Sum = rOrderDetail.Quantity * rOrderDetail.UnitPrice
                             };
            var test = queryOrder.ToList().GroupBy(o => o.Month).Select(g => new
            {
                Month = g.Key,
                TotalAmount = g.Sum(o => o.Sum)
            })
            .OrderBy(m => m.Month)
            .ToList();

            foreach (var item in test)
            {
                result.ReceivedOrders[item.Month - 1] = item.TotalAmount;
            }

            return result;
        }
    }
}
