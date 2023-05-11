using MOMShop.Dto.Cart;
using MOMShop.Entites;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces.UserService
{
    public interface IUserCartService
    {
        CartDto Create(CartDto input);
        CartDto Update(CartDto input);
        void Delete(int id);
        List<ViewCartDto> GetAll(int? customerId);
    }
}
