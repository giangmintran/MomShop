﻿using MOMShop.Dto.Product;
using MOMShop.Dto.ProductDetail;
using MOMShop.Entites;
using MOMShop.Utils;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces
{
    public interface IProductServices
    {
        Paging<ProductDto> GetProducts(FilterProductDto input);
        ProductDto AddProducts(UpdateProductDto input);
        List<ProductDetailDto> FindById(int id);
        ProductDto UpdateProducts(UpdateProductDto input);
        void DeleteProducts(int id);

    }
}
