using Microsoft.EntityFrameworkCore;

namespace MOMShop.MomShopDbContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
    }
}
