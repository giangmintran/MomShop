namespace MOMShop.Utils.Payment
{
    public class PaymentRequestModel
    {
        public int OrderId { get; set; }
        public float Amount { get; set; }
        public string ReturnUrl { get; set; }
        public string Locale { get; set; }
        public string CurrCode { get; set; }
        public string OrderInfo { get; set; }
        public string IpAdrr { get; set; }
        public string CreateDate { get; set; }
        public string ExprireDate { get; set; }
        public string BillMobile { get; set; }
        public string BillEmail { get; set; }
        public string SecureHash { get; set; }
        public string TmnCode { get; set; }
        public string Command { get; set; }
        public string Version { get; set; }
        public string TnxRef { get; set; }
        public string OrderType { get; set; }

        public override string ToString()
        {
            // Tạo chuỗi dữ liệu gửi đi theo định dạng x-www-form-urlencoded
            return $"vnp_Amount={Amount}&vnp_Command={Command}&vnp_TmnCode={TmnCode}&vnp_OrderType={OrderType}&vnp_CreateDate={CreateDate}&vnp_ExpireDate={ExprireDate}&vnp_IpAddr={IpAdrr}&vnp_Locale={Locale}&vnp_OrderInfo={OrderInfo}&vnp_ReturnUrl={ReturnUrl}&vnp_Version={Version}&vnp_SecureHash={SecureHash}&vnp_TxnRef={TnxRef}";
        }
    }
}
