using MOMShop.Dto.Users;
using MOMShop.Entites;

namespace MOMShop.Utils.APIResponse
{
    public class APIResponse
    {
        public object Data { get; set; }
        public string Message { get; set; }

        public APIResponse(object data, string message)
        {
            Data = data;
            Message = message;
        }

        public APIResponse(string message)
        {
            Message = message;
        }
    }
}
