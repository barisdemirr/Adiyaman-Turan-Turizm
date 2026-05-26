using ATT.Business.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly IGalleryImageService _galleryImageService;
        public GalleryController(IGalleryImageService galleryImageService)
        {
            _galleryImageService = galleryImageService;
        }

        [HttpGet]
        [EnableRateLimiting("PublicGetPolicy")]
        public async Task<IActionResult> GetAllGalleryImages()
        {
            var galleryImages = await _galleryImageService.GetAllGalleryImages();

            return Ok(galleryImages);
        }
    }
}
