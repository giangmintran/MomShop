using MOMShop.Entites;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces
{
    public interface IProductServices
    {
        List<Product> GetProducts();
    }
}
