using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MOMShop.Dto.ReceiveOrder;
using MOMShop.Dto.ReceiveOrderDetail;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using MOMShop.Utils;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MOMShop.Services.Implements
{
    public class ReceiveOrderServices : IReceiveOrderServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ReceiveOrderServices(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;

        }

        public ReceiveOrderDto Add(CreateReceiveOrderDto input)
        {
            var insert = _mapper.Map<ReceiveOrder>(input);
            var result = _dbContext.Add(insert);
            _dbContext.SaveChanges();

            foreach (var item in input.Details)
            {
                var detail = new ReceiveOrderDetail()
                {
                    ReceiveOrderId = result.Entity.Id,
                    Code = item.Code,
                    Name = item.Name,
                    Type = item.Type,
                    Size = item.Size,
                    Quantity = item.Quantity,
                    Description = item.Description,
                };
                _dbContext.ReceiveOrderDetails.Add(detail);
            }
            _dbContext.SaveChanges();

            return _mapper.Map<ReceiveOrderDto>(result.Entity);
        }

        public void Delete(int id)
        {
            var receiveOrder = _dbContext.ReceiveOrders.FirstOrDefault(e => e.Id == id);
            if (receiveOrder == null)
            {
                throw new Exception("Không tìm thấy sản phẩm");
            }
            var orderDetail = _dbContext.ReceiveOrderDetails.Where(e => e.ReceiveOrderId == id);
            _dbContext.ReceiveOrderDetails.RemoveRange(orderDetail);
            receiveOrder.Deleted = true;
            _dbContext.SaveChanges();
        }

        public ReceiveOrderDto FindById(int id)
        {
            var receiveOrder = _dbContext.ReceiveOrders.FirstOrDefault(e => e.Id == id);
            if (receiveOrder == null)
            {
                throw new Exception("Không tìm thấy sản phẩm");
            }

            var details = _dbContext.ReceiveOrderDetails.Where(e => e.ReceiveOrderId == id);
            var result = _mapper.Map<ReceiveOrderDto>(receiveOrder);

            if (details.Any())
            {
                result.Details = _mapper.Map<List<ReceiveOrderDetailDto>>(details);
            }
            return result;
        }

        public List<ReceiveOrderDto> GetReceiveOrders(FilterReceiveOrderDto input)
        {
            var resultItem = new List<ReceiveOrderDto>();
            var receiveOrders = _dbContext.ReceiveOrders.Where(e => !e.Deleted && (input.Status == null || e.Status == input.Status) && (input.Keyword == null 
            || e.Code.Contains(input.Keyword)
            || e.Supplier.Contains(input.Keyword)
            || e.Receiver.Contains(input.Keyword)
            )).OrderByDescending(e => e.Id).ToList();
            resultItem = _mapper.Map<List<ReceiveOrderDto>>(receiveOrders);
            foreach (var item in resultItem)
            {
                var orderDetail = _dbContext.ReceiveOrderDetails.Where(e => e.ReceiveOrderId == item.Id).OrderByDescending(e => e.Id).ToList();
                item.Details = _mapper.Map<List<ReceiveOrderDetailDto>>(orderDetail);
            }
            return resultItem;
        }

        public ReceiveOrderDto Update(CreateReceiveOrderDto input)
        {
            var receiveOrder = _dbContext.ReceiveOrders.FirstOrDefault(e => e.Id == input.Id);
            if (receiveOrder == null)
            {
                throw new Exception("Không tìm thấy sản phẩm");
            }
            receiveOrder.Code = input.Code;
            receiveOrder.ReceivedDate = input.ReceivedDate;
            receiveOrder.Supplier = input.Supplier;
            receiveOrder.Receiver = input.Receiver;
            receiveOrder.Description = input.Description;

            var products = _dbContext.ReceiveOrderDetails.Where(e => e.ReceiveOrderId == receiveOrder.Id && !input.Details.Contains(e.ProductId)).ToList();
            foreach (var item in products)
            {
                _dbContext.ProductCollections.Remove(item);
            }
            foreach (var item in input.Products)
            {
                var productCollection = _dbContext.ProductCollections.FirstOrDefault(e => e.ProductId == item && e.CollectionId == collection.Id);
                if (productCollection == null)
                {
                    _dbContext.ProductCollections.Add(new ProductCollection
                    {
                        CollectionId = collection.Id,
                        ProductId = item,
                    });
                }
            }
            _dbContext.SaveChanges();
            return _mapper.Map<ReceiveOrderDto>(receiveOrder);
        }
    }
}
