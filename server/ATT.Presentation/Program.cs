using ATT.Business.Abstract;
using ATT.Business.Abstract.Common;
using ATT.Business.Abstract.Sections;
using ATT.Business.Concrete;
using ATT.Business.Concrete.Common;
using ATT.Business.Concrete.Sections;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Abstract.Common;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections;
using ATT.Presentation;
using Microsoft.EntityFrameworkCore;
using System;

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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowHost", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://192.168.1.165:3000") 
              .AllowAnyHeader()
              .AllowAnyMethod();
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
