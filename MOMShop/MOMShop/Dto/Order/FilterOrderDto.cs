﻿using Microsoft.AspNetCore.Mvc;
using MOMShop.Utils;
using System.Xml.Linq;

namespace MOMShop.Dto.Order
{
    public class FilterOrderDto : PagingBase
    {
        [FromQuery(Name = "status")]
        public int? Status { get; set; }
        [FromQuery(Name = "orderCode")]
        public string OrderCode { get; set; }

        [FromQuery(Name = "customer")]
        public int? CustomerId { get; set; }
    }
}
