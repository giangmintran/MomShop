using MOMShop.Entites;
using MOMShop.Services.Interfaces;
using System.Collections.Generic;

namespace MOMShop.Services.Implements
{
    public class ProductServices : IProductServices
    {
        public List<Product> GetProducts()
        {
            List<Product> result = new();
            result.Add(new Product { Id = 1, Name = "New Jacket AC", Category = 1, Quantity = 100 });
            result.Add(new Product { Id = 2, Name = "Bad Habbit CC", Category = 1, Quantity = 100 });
            result.Add(new Product { Id = 3, Name = "Quần 1", Category = 2, Quantity = 100 });
            result.Add(new Product { Id = 4, Name = "Mũ", Category = 3, Quantity = 100 });
            result.Add(new Product { Id = 5, Name = "Túi", Category = 4, Quantity = 100 });
            return result;
        }
    }
}
