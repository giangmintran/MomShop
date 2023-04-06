using MOMShop.Dto.Product;
using MOMShop.Entites;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces
{
    public interface IProductServices
    {
        List<Product> GetProducts();
        Product AddProducts(UpdateProductDto input);
        Product FindById(int id);
        Product UpdateProducts(UpdateProductDto input);
        void DeleteProducts(int id);

    }
}
