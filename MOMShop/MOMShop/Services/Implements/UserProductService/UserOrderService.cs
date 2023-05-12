using AutoMapper;
using MOMShop.Dto.Order;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces.UserService;

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
            foreach (var item in order.OrderDetails)
            {
                var detail = _mapper.Map<OrderDetail>(item);
                detail.OrderId = result.Entity.Id;
            }
            _dbContext.SaveChanges();
            return order;
        }
    }
}
