using AutoMapper;
using MOMShop.Dto.Dashboard;
using MOMShop.Dto.Product;
using MOMShop.Dto.ProductDetail;
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
            var order = _dbContext.Orders.Where(e => !e.Deleted && e.CreatedDate.Year == DateTime.Now.Year && e.OrderStatus == OrderStatus.HOAN_THANH).ToList().GroupBy(o => new { o.CreatedDate.Year, o.CreatedDate.Month }).Select(g => new
            {
                Month = g.Key.Month,
                TotalAmount = g.Sum(o => o.TotalAmount)
            })
            .OrderBy(m => m.Month)
            .ToList();

            foreach (var item in order)
            {
                result.Orders[item.Month - 1] = item.TotalAmount;
            }

            var recOrder = _dbContext.ReceiveOrders.Where(e => !e.Deleted && e.CreatedDate.Year == DateTime.Now.Year && e.Status == ReceiveOrderStatus.DA_THANH_TOAN);
            
            var test = recOrder.ToList().GroupBy(o => o.CreatedDate.Month).Select(g => new
            {
                Month = g.Key,
                TotalAmount = g.Sum(e => e.TotalMoney)
            })
            .OrderBy(m => m.Month)
            .ToList();

            foreach (var item in test)
            {
                result.ReceivedOrders[item.Month - 1] = item.TotalAmount;
            }

            var products = _dbContext.Products.ToList();
            result.Products = _mapper.Map<List<ProductDto>>(products);
            foreach (var product in result.Products)
            {
                var productDetails = _dbContext.ProductDetails.Where(e => e.ProductId == product.Id).ToList();
                var image = _dbContext.ProductImages.FirstOrDefault(e => e.ProductId == product.Id);
                if (image != null)
                {
                    product.ImageUrl = image.ImageUrl;
                }
            }
            return result;
        }
    }
}
