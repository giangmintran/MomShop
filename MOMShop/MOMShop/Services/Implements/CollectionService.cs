using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using MOMShop.Dto.Collection;
using MOMShop.Dto.Product;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MOMShop.Services.Implements
{
    public class CollectionService : ICollectionService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CollectionService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public CollectionDto Create(CollectionDto input)
        {
            var insert = _mapper.Map<Collection>(input);
            var result = _dbContext.Collections.Add(insert);
            _dbContext.SaveChanges();
            return _mapper.Map<CollectionDto>(result.Entity);
        }

        public void Delete(int id)
        {
            var collection = _dbContext.Collections.FirstOrDefault(e => e.Id == id && !e.Deleted);
            if (collection == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }
            collection.Deleted = true;
            _dbContext.SaveChanges();
        }

        public List<CollectionDto> FindAll()
        {
            var collections = _dbContext.Collections.Where(e => !e.Deleted).OrderByDescending(e => e.Id).ToList();
            return _mapper.Map<List<CollectionDto>>(collections);
        }

        public CollectionDto FindById(int id)
        {
            var collection = _dbContext.Collections.FirstOrDefault(e => e.Id == id && !e.Deleted);
            if (collection == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }
            return _mapper.Map<CollectionDto>(collection);
        }

        public CollectionDto Update(CollectionDto input)
        {
            var collection = _dbContext.Collections.FirstOrDefault(e => e.Id == input.Id && !e.Deleted);
            if (collection == null)
            {
                throw new System.Exception("Không tìm thấy sản phẩm");
            }
            collection.Name = input.Name;
            collection.Description = input.Description;
            collection.Status = input.Status;
            _dbContext.SaveChanges();
            return _mapper.Map<CollectionDto>(collection);
        }
    }
}
