using ATT.Business.Abstract;
using ATT.Business.Abstract.Common;
using ATT.Business.Abstract.Sections;
using ATT.Business.Concrete;
using ATT.Business.Concrete.Common;
using ATT.Business.Concrete.Sections;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Abstract.Common;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections;
using ATT.Presentation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// ------SERVICES--------

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ATTDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IFavoritesSectionRepository, FavoritesSectionRepository>();
builder.Services.AddScoped<IGallerySectionRepository, GallerySectionRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<ITourDateRepository, TourDateRepository>();
builder.Services.AddScoped<ITourExtraRepository, TourExtraRepository>();
builder.Services.AddScoped<ITourRepository, TourRepository>();
builder.Services.AddScoped<IToursSectionRepository, ToursSectionRepository>();
builder.Services.AddScoped<IServicesSectionRepository, ServicesSectionRepository>();
builder.Services.AddScoped<IHeroSectionRepository, HeroSectionRepository>();
builder.Services.AddScoped<IAboutSectionRepository, AboutSectionRepository>();
builder.Services.AddScoped<IContactSectionRepository, ContactSectionRepository>();
builder.Services.AddScoped<IAboutItemRepository, AboutItemRepository>();
builder.Services.AddScoped<IContactInfoRepository, ContactInfoRepository>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();


builder.Services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
builder.Services.AddScoped<IAboutSectionService, AboutSectionService>();
builder.Services.AddScoped<IContactSectionService, ContactSectionService>();
builder.Services.AddScoped<IFavoritesSectionService, FavoritesSectionService>();
builder.Services.AddScoped<IGallerySectionService, GallerySectionService>();
builder.Services.AddScoped<IHeroSectionService, HeroSectionService>();
builder.Services.AddScoped<IHomePageService, HomePageService>();
builder.Services.AddScoped<IServicesSectionService, ServicesSectionService>();
builder.Services.AddScoped<IToursSectionService, ToursSectionService>();
builder.Services.AddScoped<ITourService, TourService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IAboutItemService, AboutItemService>();
builder.Services.AddScoped<IGalleryImageService, GalleryImageService>();    
builder.Services.AddScoped<IContactInfoService, ContactInfoService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ITourDateService, TourDateService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService,  JwtService>();
builder.Services.AddScoped<IPasswordHasher<Admin>, PasswordHasher<Admin>>();
builder.Services.AddScoped<IAdminService, AdminService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowHost", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://192.168.1.165:3000") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("StrictLoginPolicy", context =>
    {
        var ipAddress = context.Connection.RemoteIpAddress?.ToString()
            ?? context.Request.Headers["X-Forwarded-For"].ToString()
            ?? "anonymous";

        return System.Threading.RateLimiting.RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: ipAddress,
            factory: _ => new System.Threading.RateLimiting.FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            });
    });

    options.AddPolicy("PublicGetPolicy", context =>
    {
        var ipAddress = context.Connection.RemoteIpAddress?.ToString()
            ?? context.Request.Headers["X-Forwarded-For"].ToString()
            ?? "anonymous";

        return System.Threading.RateLimiting.RateLimitPartition.GetSlidingWindowLimiter(
            partitionKey: ipAddress,
            factory: _ => new System.Threading.RateLimiting.SlidingWindowRateLimiterOptions
            {
                PermitLimit = 60,
                Window = TimeSpan.FromMinutes(1),
                SegmentsPerWindow = 3,
                QueueLimit = 0
            });
    });
});


var app = builder.Build();


// ------MIDDLEWARES--------

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowHost");

app.UseStaticFiles();

app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//SEEDING

//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;
//    var context = services.GetRequiredService<ATTDbContext>();
//    await DbSeeder.SeedAsync(context);
//}

app.Run();
