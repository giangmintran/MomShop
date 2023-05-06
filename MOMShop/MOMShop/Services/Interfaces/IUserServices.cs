using MOMShop.Dto.Users;

namespace MOMShop.Services.Interfaces
{
    public interface IUserServices
    {
        UserDto Login(LoginDto input);
        string Register(RegisterDto input);
    }
}
