using MOMShop.Dto.Order;

namespace MOMShop.Services.Interfaces.UserService
{
    public interface IUserOrderService
    {
        OrderDto Create(OrderDto order);
    }
}
