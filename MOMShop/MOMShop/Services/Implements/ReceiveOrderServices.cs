﻿using AutoMapper;
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
            return _mapper.Map<ReceiveOrderDto>(result.Entity);
        }

        public void Delete(int id)
        {
            var receiveOrder = _dbContext.ReceiveOrders.FirstOrDefault(e => e.Id == id);
            if (receiveOrder == null)
            {
                throw new Exception("Không tìm thấy sản phẩm");
            }
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
            return _mapper.Map<ReceiveOrderDto>(receiveOrder);
        }

        public Paging<ReceiveOrderDto> GetReceiveOrders(FilterReceiveOrderDto input)
        {
            var result = new Paging<ReceiveOrderDto>();
            var resultItem = new List<ReceiveOrderDto>();
            var receiveOrders = _dbContext.ReceiveOrders.Where(e => !e.Deleted && (input.Status == null || e.Status == input.Status)).OrderByDescending(e => e.Id).ToList();
            resultItem = _mapper.Map<List<ReceiveOrderDto>>(receiveOrders);
            foreach (var item in resultItem)
            {
                var orderDetail = _dbContext.ReceiveOrderDetails.Where(e => e.ReceiveOrderId == item.Id).OrderByDescending(e => e.Id).ToList();
                item.Details = _mapper.Map<List<ReceiveOrderDetailDto>>(orderDetail);
            }
            result.TotalItems = resultItem.Count;
            result.Items = resultItem;
            result.Items = result.Items.Skip(input.Skip).Take(input.PageSize).ToList();
            return result;
        }

        public ReceiveOrderDto Update(CreateReceiveOrderDto input)
        {
            var receiveOrder = _dbContext.ReceiveOrders.FirstOrDefault(e => e.Id == input.Id);
            if (receiveOrder == null)
            {
                throw new Exception("Không tìm thấy sản phẩm");
            }
            receiveOrder.Code = input.Code;
            receiveOrder.CreatedDate = input.CreatedDate;
            receiveOrder.ReceivedDate = input.ReceivedDate;
            receiveOrder.Supplier = input.Supplier;
            receiveOrder.Receiver = input.Receiver;
            receiveOrder.Description = input.Description;
            _dbContext.SaveChanges();
            return _mapper.Map<ReceiveOrderDto>(receiveOrder);
        }
    }
}