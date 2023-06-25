using AutoMapper;
using Microsoft.AspNetCore.Components.Forms;
using MOMShop.Dto.Order;
using MOMShop.Dto.Order.User;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces.UserService;
using MOMShop.Utils.HistoryUpdate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using MOMShop.Dto.Users;
using System.Reflection.Metadata;
using MailKit.Security;
using MimeKit;
using MailKit.Net.Smtp;
using MOMShop.Services.Interfaces.Mail;
using MOMShop.Utils.Mail;
using System.Threading.Tasks;
using MOMShop.Utils;
using Microsoft.AspNetCore.Mvc;
using MOMShop.Utils.Payment;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using MOMShop.Utils.APIResponse;

namespace MOMShop.Services.Implements.UserProductService
{
    public class UserOrderService : IUserOrderService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ISendMailService _mail;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserOrderService(ApplicationDbContext dbContext, IMapper mapper, ISendMailService mail, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mail = mail;
            _httpContextAccessor = httpContextAccessor;
        }

        public APIResponse Create(OrderDto order)
        {

            order.CreatedDate = DateTime.Now;
            order.IntendedTime = DateTime.Now.AddDays(3);
            var insert = _mapper.Map<Order>(order);
            var orderCode = RandomNumberGenerator.GenerateRandomNumber(8);

            while (true)
            {
                var orderCoedeFind = _dbContext.Orders.FirstOrDefault(e => e.OrderCode == orderCode && !e.Deleted);
                if (orderCoedeFind != null)
                {
                    orderCode = RandomNumberGenerator.GenerateRandomNumber(8);
                    break;
                } else
                {
                    break;
                }
            }

            insert.OrderCode = orderCode;
            var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                var result = _dbContext.Orders.Add(insert);
                _dbContext.SaveChanges();

                foreach (var item in order.OrderDetails)
                {
                    var detail = _mapper.Map<OrderDetail>(item);
                    var product = _dbContext.Products.FirstOrDefault(e => e.Id == item.ProductId && !e.Deleted);
                    var productDetail = _dbContext.ProductDetails.FirstOrDefault(p => p.ProductId == item.ProductId && p.Size == item.Size);
                    if (productDetail != null)
                    {
                        if (productDetail.Quantity <= 0)
                        {
                            return new APIResponse("hethang");
                           
                        }
                        productDetail.Quantity = productDetail.Quantity - item.Quantity;
                        var productDetails = _dbContext.ProductDetails.Where(p => p.ProductId == item.ProductId);
                        if (productDetail.Quantity <= 0)
                        {
                            product.Status = Status.HET_HANG;
                        }
                        if(productDetails.All(e => e.Quantity == 0))
                        {
                            product.Status = Status.HET_HANG;
                        }
                    }
                    detail.OrderId = result.Entity.Id;
                    _dbContext.OrderDetails.Add(detail);
                    
                }
                _dbContext.SaveChanges();

                foreach (var item in order.OrderDetails)
                {
                    var cart = _dbContext.Carts.FirstOrDefault(e => e.ProductId == item.ProductId && e.CustomerId == order.CreatedBy);
                    if (cart != null)
                    {
                        _dbContext.Carts.Remove(cart);
                    }
                }

                var history = new HistoryUpdate()
                {
                    Table = HistoryUpdateTable.ORDER,
                    ReferId = result.Entity.Id,
                    Summary = "Thêm mới đơn hàng"
                };
                _dbContext.HistoryUpdates.Add(history);
                _dbContext.SaveChanges();
                transaction.Commit();
                
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }

            //Cấu hình thông tin SMTP
            try
            {
                //Lấy dịch vụ sendmailservice
                MailContent content = new MailContent
                {
                    To = "giangcoi2001@gmail.com",
                    Subject = $"[ĐƠN HÀNG {orderCode} ĐÃ ĐƯỢC ĐẶT THÀNH CÔNG]",
                    Body = $"<h1>MOMSHOP</h1>\r\n    <h2>ĐƠN HÀNG #{orderCode}</h2>\r\n    <p>Cảm ơn bạn đã đặt hàng, đơn hàng sẽ sớm được xử lý.</p>\r\n    <p>Vui lòng theo dõi gmail để biết tình trạng giao hàng.</p>\r\n    <p>\r\n        <a href=\"http://localhost:4200/order\">Xem đơn hàng</a>\r\n        hoặc\r\n        <a href=\"http://localhost:4200/view\">Đến cửa hàng của chúng tôi</a>\r\n    </p>"
                };
                _mail.SendMail(content);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send email: " + ex.Message);
            }

            return new APIResponse(insert, "done");
        }

        public List<ViewOrderDto> FindAll(FilterOrderDto input)
        {
            var orders = _dbContext.Orders.Where(e => e.CreatedBy == input.CustomerId && !e.Deleted
                                                    && (input.Status == null || e.OrderStatus == input.Status) 
                                                    && (input.OrderCode == null || e.OrderCode.Contains(input.OrderCode))).ToList();
            var result = _mapper.Map<List<ViewOrderDto>>(orders);
            foreach (var item in result)
            {
                var orderDetail = _dbContext.OrderDetails.Where(e => e.OrderId == item.Id).ToList();
                item.Details = _mapper.Map<List<ViewOrderDetail>>(orderDetail);
                foreach (var detail in item.Details)
                {
                    var product = _dbContext.Products.FirstOrDefault(e => e.Id == detail.ProductId && !e.Deleted);
                    if (product != null)
                    {
                        detail.Name = product.Name;
                        detail.Price = product.Price;
                        var productImage = _dbContext.ProductImages.FirstOrDefault(e => e.ProductId == product.Id);
                        detail.ImageUrl = productImage?.ImageUrl;
                        detail.Total = detail.Price * detail.Quantity;
                    }
                }
            }

            if (input.Keyword != null)
            {
                result = result.Where(e => e.Details.Where(detail => detail.Name.Contains(input.Keyword)).Any()).ToList();
            }

            return result;
        }

        public OrderDto FindById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateStatus(int id, int status)
        {
            var order = _dbContext.Orders.FirstOrDefault(e => e.Id == id && !e.Deleted);
            if (order != null)
            {
                order.OrderStatus = status;
            }
            _dbContext.SaveChanges();
        }
    }
}
