using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.AboutSection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers.Sections
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AboutSectionController : ControllerBase
    {
        private readonly IAboutSectionService _aboutSectionService;

        public AboutSectionController(IAboutSectionService aboutSectionService)
        {
            _aboutSectionService = aboutSectionService;
        }

        [HttpGet] 
        public async Task<IActionResult> GetAboutSection()
        {
            var result = await _aboutSectionService.GetAboutSection();

            if (result == null)
            {
                return NotFound(new { message = "Hakkımızda bulunamadı." });
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateAboutSectionDto dto)
        {
            var result = await _aboutSectionService.UpdateAboutSectionAsync(dto);
            if (!result) return NotFound(new { message = "Hakkımızda section alanı bulunamadı." });
            return Ok(new { message = "Hakkımızda üst başlık alanı güncellendi." });
        }
    }
}
