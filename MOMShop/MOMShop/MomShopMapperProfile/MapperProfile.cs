using AutoMapper;
using MOMShop.Dto.Cart;
using MOMShop.Dto.Collection;
using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using MOMShop.Dto.Product;
using MOMShop.Dto.ProductDetail;
using MOMShop.Dto.ReceiveOrder;
using MOMShop.Dto.ReceiveOrderDetail;
using MOMShop.Dto.Users;
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
            CreateMap<ProductDetailDto, ProductDetail>().ReverseMap();
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

            #region Collection
            CreateMap<CollectionDto, Collection>().ReverseMap();
            CreateMap<ViewCollectionDto, Collection>().ReverseMap();
            CreateMap<ViewProductCollectionDto, Product>().ReverseMap();
            #endregion

            #region Users
            CreateMap<UserDto, Users>().ReverseMap();
            CreateMap<RegisterDto, Users>().ReverseMap();
            CreateMap<LoginDto, Users>().ReverseMap();
            #endregion

            #region Cart
            CreateMap<CartDto, Cart>().ReverseMap();
            #endregion

            #region Order
            CreateMap<OrderDto, Order>().ReverseMap();
            CreateMap<ViewOrderDto, Order>().ReverseMap();
            CreateMap<ViewOrderDetail, OrderDetail>().ReverseMap();
            CreateMap<CreateOrderDetailDto, OrderDetail>().ReverseMap();
            #endregion
        }
    }
}
