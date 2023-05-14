﻿using AutoMapper;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using MOMShop.Dto.Users;
using MOMShop.Entites;
using MOMShop.MomShopDbContext;
using MOMShop.Services.Interfaces;
using System.Linq;

namespace MOMShop.Services.Implements
{
    public class UserService : IUserServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public UserDto FindById(int id)
        {
            var user = _dbContext.Users.FirstOrDefault(e => e.Id == id);
            return _mapper.Map<UserDto>(user);
        }

        public UserDto Login(LoginDto input)
        {
            var user = _dbContext.Users.FirstOrDefault(e => e.Email == input.Email && e.Password == input.Password);
            if (user == null)
            {
                return null;
            }
            return _mapper.Map<UserDto>(user);
        }

        public string Register(RegisterDto input)
        {
            var insert = _mapper.Map<Users>(input);

            var user = _dbContext.Users.FirstOrDefault(e => e.Email == input.Email && !e.Deleted);
            if (user != null)
            {
                return "duplicate";
            }
            _dbContext.Users.Add(insert);
            _dbContext.SaveChanges();
            return "success";
        }
    }
}
