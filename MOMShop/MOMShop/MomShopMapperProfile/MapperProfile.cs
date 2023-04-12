using AutoMapper;
using MOMShop.Dto.Order;
using MOMShop.Dto.Product;
using MOMShop.Entites;

namespace MOMShop.MomShopMapperProfile
{
    public class MapperProfile : Profile
    {
        public MapperProfile() 
        {
            CreateMap<CreateProductDto, Product>().ReverseMap();
            CreateMap<UpdateProductDto, Product>().ReverseMap();
            CreateMap<ProductDto, Product>().ReverseMap();
            #region Order
            CreateMap<OrderDto, Order>().ReverseMap();
            #endregion
        }
    }
}
