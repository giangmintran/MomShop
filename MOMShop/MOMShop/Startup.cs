using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MOMShop.MomShopDbContext;
using MOMShop.MomShopMapperProfile;
using MOMShop.Services.Implements;
using MOMShop.Services.Implements.UserProductService;
using MOMShop.Services.Interfaces;
using MOMShop.Services.Interfaces.UserService;

namespace MOMShop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(options =>
                        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MOMShop", Version = "v1" });
            });

            services.AddAutoMapper(typeof(MapperProfile));
            //Add Services
            services.AddScoped<IProductServices, ProductServices>();
            services.AddScoped<IProductDetailServices, ProductDetailServices>();
            services.AddScoped<IOrderServices, OrderServices>();
            services.AddScoped<IOrderDetailServices, OrderDetailServices>();
            services.AddScoped<IReceiveOrderServices, ReceiveOrderServices>();
            services.AddScoped<IReceiveOrderDetailService, ReceiveOrderDetailService>();
            services.AddScoped<ICollectionService, CollectionService>();
            services.AddScoped<IUserServices, UserService>();
            services.AddScoped<IUserProductService, UserProductService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MOMShop v1"));
            }
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
