using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace MOMShop.Dto.Order
{
    public class OrderDto
    {
        public int? Id { get; set; }
        public string OrderCode { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Nation { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime IntendedTime { get; set; }
        public int PaymentType { get; set; }
        public int OrderStatus { get; set; }
        public float DeliveryCost { get; set; }
        public string DiscountCode { get; set; }
        public float TotalAmount { get; set; }
        public float Description { get; set; }
        public int? CreatedBy { get; set; }
        public List<CreateOrderDetailDto> OrderDetails { get; set; }
    }

    public class CreateOrderDetailDto
    {
        public int ProductId { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
    }
}
