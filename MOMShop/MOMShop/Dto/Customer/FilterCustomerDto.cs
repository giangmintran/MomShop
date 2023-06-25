using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Mvc;
using MOMShop.Utils;

namespace MOMShop.Dto.Customer
{
    public class FilterCustomerDto : PagingBase
    {
        [FromQuery(Name = "status")]
        public int? Status { get; set; }
    }
}
