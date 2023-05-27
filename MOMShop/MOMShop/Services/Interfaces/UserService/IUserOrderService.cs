using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using MOMShop.Entites;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces.UserService
{
    public interface IUserOrderService
    {
        Order Create(OrderDto order);
        OrderDto FindById(int id);
        List<ViewOrderDto> FindAll(FilterOrderDto input);

        void UpdateStatus(int id, int status);
    }
}
