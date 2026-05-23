using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.ToursSection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers.Sections
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ToursSectionController : ControllerBase
    {
        private readonly IToursSectionService _toursSectionService;

        public ToursSectionController(IToursSectionService toursSectionService)
        {
            _toursSectionService = toursSectionService;
        }

        [HttpGet] 
        public async Task<IActionResult> GetToursSection()
        {
            var result = await _toursSectionService.GetToursSection();

            if (result == null)
            {
                return NotFound(new { message = "Turlarımız bilgisi bulunamadı." });
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateToursSectionDto dto)
        {
            var result = await _toursSectionService.UpdateToursSectionAsync(dto);
            if (!result) return NotFound(new { message = "Turlar section alanı bulunamadı." });
            return Ok(new { message = "Turlar üst başlık alanı güncellendi." });
        }
    }
}
