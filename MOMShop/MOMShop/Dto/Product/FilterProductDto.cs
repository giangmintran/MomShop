using Microsoft.AspNetCore.Mvc;
using MOMShop.Utils;

namespace MOMShop.Dto.Product
{
    public class FilterProductDto 
    {
        [FromQuery(Name = "status")]
        public int? Status { get; set; }
    }
}
