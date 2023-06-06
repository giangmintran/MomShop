using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces.Mail;
using MOMShop.Services.Interfaces.PaymentService;
using MOMShop.Utils.APIResponse;
using MOMShop.Utils.Mail;
using MOMShop.Utils.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace MOMShop.Services.Implements.Payment
{
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ISendMailService _mail;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly VNPaySettings _vnPaySettings;
        private readonly HttpClient _httpClient;

        public PaymentService(IOptions<VNPaySettings> vnPaylSettings, ApplicationDbContext dbContext, IMapper mapper, ISendMailService mail, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mail = mail;
            _httpContextAccessor = httpContextAccessor;
            _vnPaySettings = vnPaylSettings.Value;
            _httpClient = new HttpClient();
        }

        public async Task<APIResponse> CreatePayment(PaymentRequestModel input)
        {
            //var order = _dbContext.Orders.FirstOrDefault(e => e.Id == input.OrderId && !e.Deleted);
            //if (order == null)
            //{
            //    return new APIResponse()
            //    {
            //        Message = "notfound"
            //    };
            //}

            var ipAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            //string inputDateTimeString = order.CreatedDate.ToString("yyyyMMddHHmmss");
            string inputDateTimeString = DateTime.Now.ToString("yyyyMMddHHmmss");

            //var vnPay = new PaymentRequestModel()
            //{
            //    // Xây dựng yêu cầu thanh toán dựa trên thông tin từ model và thông tin cấu hình VNPay
            //    OrderId = order.Id,
            //    Amount = order.TotalAmount,
            //    OrderInfo = $"Thanh toán hóa đơn {order.OrderCode}",
            //    IpAdrr = ipAddress,
            //    CreateDate = inputDateTimeString,
            //    BillEmail = order.Email,
            //    BillMobile = order.Phone,
            //    TmnCode = _vnPaySettings.TmnCode,
            //    SecureHashs = _vnPaySettings.SecureHashs,
            //    Locale = _vnPaySettings.Locale,
            //    CurrCode = _vnPaySettings.CurrCode,
            //    Command= _vnPaySettings.Command,
            //    ReturnUrl= "",
            //};

            var postData = new Dictionary<string, string>
            {
                { "vnp_Amount", "10000" },
                { "vnp_Command", "pay" },
                { "vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss") },
                { "vnp_CurrCode", "VND" },
                { "vnp_ExpireDate", DateTime.Now.AddMinutes(15).ToString("yyyyMMddHHmmss") },
                { "vnp_IpAddr", "127.0.0.1" },
                { "vnp_Locale", "vn" },
                { "vnp_OrderInfo", "Order Information" },
                { "vnp_OrderType", "other" },
                { "vnp_ReturnUrl", "http://localhost:4200/view" },
                { "vnp_TmnCode", "M2OST1HF" },
                { "vnp_TxnRef", "TXNREF123" },
                { "vnp_Version", "2.1.0" },
            };


            var sortedParameters = postData.OrderBy(x => x.Key); // Sắp xếp tăng dần theo tên tham số

            // Tạo dữ liệu xác thực
            var secretKey = _vnPaySettings.Vnp_SecureHash;

            string requestData = string.Join("&", postData.OrderBy(x => x.Key).Select(x => $"{x.Key}={x.Value}"));

            string checksum = GenerateChecksum(requestData, secretKey);
            // Thêm checksum vào dữ liệu yêu cầu
            requestData = requestData + $"&vnp_SecureHash={checksum}";
            var content = new StringContent(requestData, Encoding.UTF8, "application/json");
            // Gửi yêu cầu POST đến API thanh toán
            var response = await _httpClient.PostAsync("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                // Xử lý dữ liệu phản hồi từ VNPay
            }
            else
            {
                // Xử lý lỗi từ VNPay
            }
            return new APIResponse(response.RequestMessage.RequestUri.OriginalString, "");
        }
        private string GenerateChecksum(string data, string key)
        {
            byte[] dataBytes = Encoding.UTF8.GetBytes(data);
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);

            using (var hmac = new HMACSHA512(keyBytes))
            {
                byte[] hmacBytes = hmac.ComputeHash(dataBytes);
                string hmacString = BitConverter.ToString(hmacBytes).Replace("-", "").ToLower();
                return hmacString;
            }
        }
        public APIResponse PaymentNotification(PaymentNotificationModel input)
        {
            throw new System.NotImplementedException();
        }
    }
}
