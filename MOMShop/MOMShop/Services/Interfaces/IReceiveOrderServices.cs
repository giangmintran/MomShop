using MOMShop.Dto.ReceiveOrder;
using MOMShop.Utils;

namespace MOMShop.Services.Interfaces
{
    public interface IReceiveOrderServices
    {
        ReceiveOrderDto Add(CreateReceiveOrderDto input);
        ReceiveOrderDto Update(CreateReceiveOrderDto input);
        void Delete(int id);
        ReceiveOrderDto FindById(int id);
        Paging<ReceiveOrderDto> GetReceiveOrders(FilterReceiveOrderDto input);
    }
}
