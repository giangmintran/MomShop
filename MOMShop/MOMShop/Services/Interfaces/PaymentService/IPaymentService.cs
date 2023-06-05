using MOMShop.Utils.APIResponse;
using MOMShop.Utils.Payment;
using System.Threading.Tasks;

namespace MOMShop.Services.Interfaces.PaymentService
{
    public interface IPaymentService
    {
        Task<APIResponse> CreatePayment(PaymentRequestModel input);
        APIResponse PaymentNotification(PaymentNotificationModel input);
    }
}
