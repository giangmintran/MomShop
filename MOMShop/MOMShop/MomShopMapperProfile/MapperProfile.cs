using AutoMapper;
using MOMShop.Dto.Order;
using MOMShop.Dto.Product;
using MOMShop.Dto.ReceiveOrder;
using MOMShop.Dto.ReceiveOrderDetail;
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

            #region ReceiveOrder
            CreateMap<ReceiveOrderDto, ReceiveOrder>().ReverseMap();
            CreateMap<CreateReceiveOrderDto, ReceiveOrder>().ReverseMap();
            #endregion
            #region ReceiveOrderDetail
            CreateMap<ReceiveOrderDetailDto, ReceiveOrderDetail>().ReverseMap();
            #endregion
        }
    }
}
