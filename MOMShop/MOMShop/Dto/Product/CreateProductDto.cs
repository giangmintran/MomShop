using Microsoft.AspNetCore.Http;

namespace MOMShop.Dto.Product
{
    public class CreateProductDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public int ProductType { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
    }
}
