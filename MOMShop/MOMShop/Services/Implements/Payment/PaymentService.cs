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
using System.Net;
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


            var builder = new UriBuilder("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html");
            builder.Port = -1;
            var query = HttpUtility.ParseQueryString(builder.Query);
            query["vnp_Amount"] = "10000";
            query["vnp_Command"] = "pay";
            query["vnp_CreateDate"] = "DateTime.Now.ToString(\"yyyyMMddHHmmss\")";
            query["vnp_CurrCode"] = "VND";
            query["vnp_ExpireDate"] = "DateTime.Now.AddMinutes(15).ToString(\"yyyyMMddHHmmss\")";
            query["vnp_IpAddr"] = "127.0.0.1";
            query["vnp_Locale"] = "vn";
            query["vnp_OrderInfo"] = "Order Information";
            query["vnp_OrderType"] = "other";
            query["vnp_ReturnUrl"] = "http://localhost:4200/view";
            query["vnp_TmnCode"] = "M2OST1HF";
            query["vnp_Version"] = "2.1.0";
            builder.Query = query.ToString();

            string url = builder.ToString();

            return new APIResponse("");
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

        public string CalculateHMACSHA512(Dictionary<string, string> data)
        {
            // Sắp xếp các trường thông tin theo thứ tự alphabet
            var sortedData = new SortedDictionary<string, string>(data);

            // Tạo chuỗi dữ liệu
            string dataString = "";
            foreach (var entry in sortedData)
            {
                dataString += entry.Key + "=" + entry.Value + "&";
            }
            dataString = dataString.TrimEnd('&');

            // Thêm secret key vào chuỗi dữ liệu
            var secretKey = _vnPaySettings.Vnp_SecureHash;
            dataString += "&" + secretKey;

            // Tính giá trị HMACSHA512 cho chuỗi dữ liệu
            byte[] secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
            byte[] dataBytes = Encoding.UTF8.GetBytes(dataString);

            using (HMACSHA512 hmac = new HMACSHA512(secretKeyBytes))
            {
                byte[] hashBytes = hmac.ComputeHash(dataBytes);
                string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
                return hashString;
            }
        }
    }
}
