using MOMShop.Dto.Product;
using System.Collections.Generic;

namespace MOMShop.Dto.Dashboard
{
    public class DashboardDto
    {
        public List<float> Orders { get; set; }
        public List<float> ReceivedOrders { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}
