using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MOMShop.Dto.Order;
using MOMShop.Dto.Product;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
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
        public Paging<OrderDto> GetAllOrder(FilterOrderDto input)
        {
            var result = new Paging<OrderDto>();
            result.Items = new List<OrderDto>();

            var orders = _dbContext.Orders.Where(e => !e.Deleted && (input.Status == null || e.OrderStatus == input.Status)).ToList();

            foreach (var order in orders)
            {
                var item = _mapper.Map<OrderDto>(order);
                result.Items.Add(item);
            }
            result.TotalItems = result.Items.Count;

            result.Items = result.Items.Skip(input.Skip).Take(input.PageSize).ToList();
            return result;
        }
    }
}
