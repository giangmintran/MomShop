using MOMShop.Dto.Discount;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces
{
    public interface IDiscountService
    {
        DiscountDto Add(DiscountDto input);
        DiscountDto Update(DiscountDto input);
        void Delete (int id);
        List<DiscountDto> GetAll(FilterDiscountDto input);
        DiscountDto Find(int id);
        string CheckDiscountCodeExist(string discountCode);
        int CheckDiscountPercent(string discountCode);
    }
}
