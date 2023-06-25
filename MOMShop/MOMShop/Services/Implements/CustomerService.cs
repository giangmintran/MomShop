using AutoMapper;
using MOMShop.Dto.Customer;
using MOMShop.Dto.Users;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MOMShop.Services.Implements
{
    public class CustomerService : ICustomerServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CustomerService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public List<UserDto> GetAll(FilterCustomerDto input)
        {
            var query = _dbContext.Users.Where(e => !e.Deleted && e.UserType == 0 && (input.Status == null || e.Status == input.Status));
            var result = _mapper.Map<List<UserDto>>(query.ToList());
            return result;
        }
    }
}
