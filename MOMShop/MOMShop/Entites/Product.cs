using System.ComponentModel.DataAnnotations;

namespace MOMShop.Entites
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Category { get; set; }
        public int Quantity { get; set; }
    }
}
