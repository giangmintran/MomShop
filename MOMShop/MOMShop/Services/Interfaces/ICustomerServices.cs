using MOMShop.Dto.Customer;
using MOMShop.Dto.Users;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces
{
    public interface ICustomerServices
    {
        List<UserDto> GetAll(FilterCustomerDto input);
    }
}
