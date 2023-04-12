using MOMShop.Dto.Order;
using MOMShop.Utils;

namespace MOMShop.Services.Interfaces
{
    public interface IOrderServices
    {
        Paging<OrderDto> GetAllOrder(FilterOrderDto input);
    }
}
