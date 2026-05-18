using ATT.Business.Abstract;
using ATT.Business.DTOs.Image;
using ATT.Business.DTOs.Tour;
using ATT.Business.DTOs.TourDate;
using ATT.Business.DTOs.TourExtra;
using ATT.DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class TourService : ITourService
    {
        private readonly ITourRepository _tourRepository;
        public TourService(ITourRepository tourRepository)
        {
            _tourRepository = tourRepository;
        }

        public async Task<List<TourDto>> GetAllTours()
        {
            var tours = await _tourRepository.GetAllWithDetailsAsync();
            var tourList = tours.Select(tour => new TourDto
            {
                Title = tour.Title,
                Slug = tour.Slug,
                ShortDescription = tour.ShortDescription,
                Description = tour.Description,
                BannerImgUrl = tour.BannerImgUrl,
                ImageUrl = tour.ImageUrl,
                Price = tour.Price,
                Duration = tour.Duration,
                Type = tour.Type,
                Dates = tour.Dates.Select(d=>new TourDateDto { Id = d.Id, Date = d.Date }).ToList(),
                Extras = tour.Extras.Select(e=> new TourExtraDto { Id = e.Id, Title = e.Title, Description = e.Description }).ToList(),
                Images = tour.Images.Select(i => new ImageDto { Id = i.Id, ImageUrl = i.ImageUrl, IsInGallery = i.IsInGallery }).ToList()
            }).ToList();

            return(tourList);
        }

        public async Task<TourDto> GetTourBySlugAsync(string slug)
        {
            var tour = await _tourRepository.GetBySlugWithDetailsAsync(slug);

            return new TourDto
            {
                Title = tour.Title,
                Slug = tour.Slug,
                ShortDescription = tour.ShortDescription,
                Description = tour.Description,
                BannerImgUrl = tour.BannerImgUrl,
                ImageUrl = tour.ImageUrl,
                Price = tour.Price,
                Duration = tour.Duration,
                Type = tour.Type,
                Dates = tour.Dates.Select(d => new TourDateDto { Id = d.Id, Date = d.Date }).ToList(),
                Extras = tour.Extras.Select(e => new TourExtraDto { Id = e.Id, Title = e.Title, Description = e.Description }).ToList(),
                Images = tour.Images.Select(i => new ImageDto { Id = i.Id, ImageUrl = i.ImageUrl, IsInGallery = i.IsInGallery }).ToList()
            };
        }

        public async Task<List<TourReservationDto>> GetToursForReservationAsync()
        {
            return await _tourRepository.GetSelectedAsync(t => new TourReservationDto
            {
                Title = t.Title,
                Slug = t.Slug,
                Dates = t.Dates.Select(d=> new TourDateDto { Id=d.Id, Date = d.Date }).ToList(),
            });
        }
    }
}
