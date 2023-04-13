using Microsoft.AspNetCore.Mvc;
using MOMShop.Utils;

namespace MOMShop.Dto.ReceiveOrder
{
    public class FilterReceiveOrderDto : PagingBase
    {
        [FromQuery(Name = "status")]
        public int? Status { get; set; }
    }
}
