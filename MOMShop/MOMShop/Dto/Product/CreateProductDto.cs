namespace MOMShop.Dto.Product
{
    public class CreateProductDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int ProductType { get; set; }
        public float Description { get; set; }
    }
}
