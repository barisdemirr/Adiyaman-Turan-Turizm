using ATT.Business.Abstract;
using ATT.Business.DTOs.Tour;
using ATT.Presentation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace ATT.Presentation.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        private readonly ITourService _tourService;
        public ToursController(ITourService tourService)
        {
            _tourService = tourService;
        }

        [AllowAnonymous]
        [HttpGet]
        [EnableRateLimiting("PublicGetPolicy")]
        public async Task<IActionResult> GetAllTours()
        {
            var tourList = await _tourService.GetAllTours();

            return Ok(tourList);
        }

        [AllowAnonymous]
        [EnableRateLimiting("PublicGetPolicy")]
        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {

            var tour = await _tourService.GetTourBySlugAsync(slug);


            return Ok(tour);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tour = await _tourService.GetTourByIdAsync(id);
            if (tour == null)
                return NotFound(new { message = "Aradığınız id'ye ait tur bulunamadı." });

            return Ok(tour);
        }


        [AllowAnonymous]
        [EnableRateLimiting("PublicGetPolicy")]
        [HttpGet("reservation")]
        public async Task<IActionResult> GetToursForReservation()
        {
            var list = await _tourService.GetToursForReservationAsync();

            return Ok(list);
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetAllToursAdmin()
        {
            var tourList = await _tourService.GetAllToursAdmin();

            return Ok(tourList);
        }


        [HttpGet("toursnumber")]
        public async Task<IActionResult> GetToursNumber()
        {
            var res = await _tourService.CountTours();

            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTour([FromForm] CreateTourRequest request)
        {
            if (request.BannerFile == null || request.MainFile == null)
                return BadRequest("Kapak resmi ve ana resim zorunludur.");

            var dto = new CreateTourDto
            {
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Description = request.Description,
                Price = request.Price,
                Duration = request.Duration,
                Category = request.Category,
                BannerStream = request.BannerFile.OpenReadStream(),
                BannerFileName = request.BannerFile.FileName,
                MainStream = request.MainFile.OpenReadStream(),
                MainFileName = request.MainFile.FileName
            };

            if (request.Images != null)
            {
                foreach (var img in request.Images)
                {
                    if (img.File != null && img.File.Length > 0)
                    {
                        dto.Images.Add(new TourImageCreationDto
                        {
                            FileStream = img.File.OpenReadStream(),
                            FileName = img.File.FileName,
                            IsInGallery = img.IsInGallery
                        });
                    }
                }
            }

            await _tourService.CreateTourAsync(dto);

            return Ok( new { message = "Tur ve ilişkili tüm görseller başarıyla kaydedildi!" });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] UpdateTourRequest request)
        {
            var dto = new UpdateTourDto
            {
                Id = request.Id,
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Description = request.Description,
                Price = request.Price,
                Duration = request.Duration,
                Category = request.Category,
                BannerStream = request.BannerFile?.OpenReadStream(),
                BannerFileName = request.BannerFile?.FileName,
                MainStream = request.MainFile?.OpenReadStream(),
                MainFileName = request.MainFile?.FileName
            };

            if (request.ExistingImages != null)
            {
                foreach (var img in request.ExistingImages)
                {
                    dto.ExistingImages.Add(new ExistingImageUpdateDto
                    {
                        Id = img.Id,
                        IsInGallery = img.IsInGallery,
                        IsDeleted = img.IsDeleted
                    });
                }
            }

            if (request.NewImages != null)
            {
                foreach (var img in request.NewImages)
                {
                    if (img.File != null && img.File.Length > 0)
                    {
                        dto.NewImages.Add(new TourImageCreationDto
                        {
                            FileStream = img.File.OpenReadStream(),
                            FileName = img.File.FileName,
                            IsInGallery = img.IsInGallery
                        });
                    }
                }
            }

            await _tourService.UpdateTourAsync(dto);
            return Ok(new { message = "Tur planlaması ve bağlı tüm görseller başarıyla güncellendi!" });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _tourService.DeleteTourAsync(id);
            return Ok(new { message = "Tur planı ve ilişkili tüm dosyalar başarıyla imha edildi!" });
        }
    }
}
