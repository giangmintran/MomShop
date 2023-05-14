using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces.UserService
{
    public interface IUserOrderService
    {
        OrderDto Create(OrderDto order);
        List<ViewOrderDto> FindAll(FilterOrderDto input);
    }
}
