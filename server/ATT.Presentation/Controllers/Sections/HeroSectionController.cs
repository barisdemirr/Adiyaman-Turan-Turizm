using ATT.Business.Abstract.Sections;
using ATT.Business.Concrete.Sections;
using ATT.Business.DTOs.Sections.HeroSection;
using ATT.Presentation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers.Sections
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroSectionController : ControllerBase
    {
        private readonly IHeroSectionService _heroSectionService;
        public HeroSectionController(IHeroSectionService heroSectionService)
        {
            _heroSectionService = heroSectionService;   
        }

        [HttpGet]
        public async Task<IActionResult> GetHeroSection()
        {
            var result = await _heroSectionService.GetHeroSection();

            if (result == null)
            {
                return NotFound(new { message = "Giriş bulunamadı." });
            }

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromForm] UpdateHeroRequest request)
        {
            var businessDto = new UpdateHeroSectionDto
            {
                Title = request.Title,
                Description = request.Description,
                Tag = request.Tag
            };

            if (request.ImageFile != null && request.ImageFile.Length > 0)
            {
                businessDto.ImageStream = request.ImageFile.OpenReadStream();
                businessDto.ImageFileName = request.ImageFile.FileName;
            }

            try
            {
                var result = await _heroSectionService.UpdateHeroSectionAsync(businessDto);
                if (!result) return NotFound(new { message = "Hero Section bulunamadı." });

                return Ok(new { message = "Hero Section güncellendi." });
            }
            finally
            {
                if (businessDto.ImageStream != null)
                {
                    await businessDto.ImageStream.DisposeAsync();
                }
            }
        }
    }
}
