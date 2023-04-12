using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System;

namespace MOMShop.Dto.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string OrderCode { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime IntendedTime { get; set; }
        public int PaymentType { get; set; }
        public int OrderStatus { get; set; }
        public float TotalAmount { get; set; }
        public bool Deleted { get; set; }
    }
}
