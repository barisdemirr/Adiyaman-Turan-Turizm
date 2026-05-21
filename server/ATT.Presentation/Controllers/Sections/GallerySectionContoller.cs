using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.GallerySection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers.Sections
{
    [Route("api/[controller]")]
    [ApiController]
    public class GallerySectionController : ControllerBase
    {
        private readonly IGallerySectionService _gallerySectionService;

        public GallerySectionController(IGallerySectionService gallerySectionService)
        {
            _gallerySectionService = gallerySectionService;
        }

        [HttpGet] 
        public async Task<IActionResult> GetGallerySection()
        {
            var result = await _gallerySectionService.GetGallerySection();

            if (result == null)
            {
                return NotFound(new { message = "Galeri bilgisi bulunamadı." });
            }

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateGallerySectionDto dto)
        {
            var result = await _gallerySectionService.UpdateGallerySectionAsync(dto);
            if (!result) return NotFound(new { message = "Galeri section alanı bulunamadı." });
            return Ok(new { message = "Galeri üst başlık alanı güncellendi." });
        }
    }
}
