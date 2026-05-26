using ATT.Business.Abstract;
using ATT.Business.DTOs.Image;
using ATT.Business.DTOs.Tour;
using ATT.Business.DTOs.TourDate;
using ATT.Business.DTOs.TourExtra;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class TourService : ITourService
    {
        private readonly ITourRepository _tourRepository;
        private readonly IImageService _imageService;
        private readonly IImageRepository _imageRepository;
        private readonly ITourDateRepository _tourDateRepository;
        private readonly ITourExtraRepository _tourExtraRepository;
        public TourService(ITourRepository tourRepository, IImageService imageService, IImageRepository imageRepository, ITourDateRepository tourDateRepository, ITourExtraRepository tourExtraRepository)
        {
            _tourRepository = tourRepository;
            _imageService = imageService;
            _imageRepository = imageRepository;
            _tourDateRepository = tourDateRepository;
            _tourExtraRepository = tourExtraRepository;
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

        public async Task<TourDto> GetTourByIdAsync(int id)
        {
            var tour = await _tourRepository.GetByIdWithDetailsAsync(id);

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

        public async Task<List<TourAdminDto>> GetAllToursAdmin()
        {
            var tours = await _tourRepository.GetAllWithDetailsAsync();
            var tourList = tours.Select(tour => new TourAdminDto
            {
                Id = tour.Id,
                Title = tour.Title,
                Slug = tour.Slug,
                Price = tour.Price,
            }).ToList();

            return (tourList);
        }

        public async Task CreateTourAsync(CreateTourDto dto)
        {
            string bannerPath = await _imageService.ScaleAndUploadImageAsync(dto.BannerStream, dto.BannerFileName, "tours/banners", 600);
            string mainPath = await _imageService.ScaleAndUploadImageAsync(dto.MainStream, dto.MainFileName, "tours/mains", 1080);

            var tour = new Tour
            {
                Title = dto.Title,
                ShortDescription = dto.ShortDescription,
                Slug = GenerateSlug(dto.Title),
                Description = dto.Description,
                Price = dto.Price,
                Duration = dto.Duration,
                Type = dto.Category,
                BannerImgUrl = bannerPath,
                ImageUrl = mainPath,
                Images = new List<Image>()
            };

            foreach (var imgDto in dto.Images)
            {
                string extraPath = await _imageService.ScaleAndUploadImageAsync(imgDto.FileStream, imgDto.FileName, "tours/extras", 1080);

                tour.Images.Add(new Image
                {
                    ImageUrl = extraPath,
                    IsInGallery = imgDto.IsInGallery
                });
            }

            await _tourRepository.AddAsync(tour);
        }

        private string GenerateSlug(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return string.Empty;

            text = text.ToLowerInvariant();

            var turkishChars = new[] { 'ç', 'ğ', 'ı', 'ö', 'ş', 'ü' };
            var englishChars = new[] { 'c', 'g', 'i', 'o', 's', 'u' };

            for (int i = 0; i < turkishChars.Length; i++)
            {
                text = text.Replace(turkishChars[i], englishChars[i]);
            }

            text = Regex.Replace(text, @"[^a-z0-9\s-]", "");

            text = Regex.Replace(text, @"\s+", " ").Trim();

            text = text.Replace(" ", "-");

            return text;
        }


        public async Task UpdateTourAsync(UpdateTourDto dto)
        {
            var tour = await _tourRepository.GetByIdWithDetailsAsync(dto.Id);
            if (tour == null)
                throw new Exception("Güncellenmek istenen tur sistemde bulunamadı.");

            tour.Title = dto.Title;
            tour.Slug = GenerateSlug(dto.Title);
            tour.ShortDescription = dto.ShortDescription;
            tour.Description = dto.Description;
            tour.Price = dto.Price;
            tour.Duration = dto.Duration;
            tour.Type = dto.Category;

            if (dto.BannerStream != null && dto.BannerStream.Length > 0)
            {
                DeletePhysicalFile(tour.BannerImgUrl);
                tour.BannerImgUrl = await _imageService.ScaleAndUploadImageAsync(dto.BannerStream, dto.BannerFileName, "tours/banners", 600);
            }

            if (dto.MainStream != null && dto.MainStream.Length > 0)
            {
                DeletePhysicalFile(tour.ImageUrl);
                tour.ImageUrl = await _imageService.ScaleAndUploadImageAsync(dto.MainStream, dto.MainFileName, "tours/mains", 1080);
            }

            foreach (var existingDto in dto.ExistingImages)
            {
                var dbImage = tour.Images.FirstOrDefault(x => x.Id == existingDto.Id);
                if (dbImage != null)
                {
                    if (existingDto.IsDeleted)
                    {
                        DeletePhysicalFile(dbImage.ImageUrl);

                        tour.Images.Remove(dbImage);

                        await _imageRepository.RemoveAsync(dbImage);
                    }
                    else
                    {
                        dbImage.IsInGallery = existingDto.IsInGallery;
                    }
                }
            }

            foreach (var newImgDto in dto.NewImages)
            {
                string extraPath = await _imageService.ScaleAndUploadImageAsync(newImgDto.FileStream, newImgDto.FileName, "tours/extras", 1080);

                tour.Images.Add(new Image
                {
                    ImageUrl = extraPath,
                    IsInGallery = newImgDto.IsInGallery
                });
            }

            await _tourRepository.UpdateAsync(tour);
        }

        public async Task DeleteTourAsync(int id)
        {
            var tour = await _tourRepository.GetByIdWithDetailsAsync(id);
            if (tour == null)
                throw new Exception("Silinmek istenen tur sistemde bulunamadı.");

            DeletePhysicalFile(tour.BannerImgUrl);
            DeletePhysicalFile(tour.ImageUrl);

            if (tour.Dates != null)
            {
                foreach (var date in tour.Dates.ToList())
                {
                    await _tourDateRepository.RemoveAsync(date);
                }
            }

            if (tour.Images != null)
            {
                foreach (var img in tour.Images.ToList())
                {
                    DeletePhysicalFile(img.ImageUrl);
                    await _imageRepository.RemoveAsync(img);
                }
            }

            if (tour.Extras != null)
            {
                foreach (var extra in tour.Extras.ToList())
                {
                    await _tourExtraRepository.RemoveAsync(extra);
                }
            }

            await _tourRepository.RemoveAsync(tour);
        }

        private void DeletePhysicalFile(string? relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath)) return;

            try
            {
                var cleanPath = relativePath.StartsWith("/") ? relativePath.Substring(1) : relativePath;

                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", cleanPath);

                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }
            }
            catch (Exception)
            {
                
            }
        }


    }
}
