using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.ServicesSection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers.Sections
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesSectionController : ControllerBase
    {
        private readonly IServicesSectionService _servicesSectionService;

        public ServicesSectionController(IServicesSectionService servicesSectionService)
        {
            _servicesSectionService = servicesSectionService;
        }

        [HttpGet] 
        public async Task<IActionResult> GetServicesSection()
        {
            var result = await _servicesSectionService.GetServicesSection();

            if (result == null)
            {
                return NotFound(new { message = "Hizmetlerimiz bilgisi bulunamadı ." });
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateServicesSectionDto dto)
        {
            var result = await _servicesSectionService.UpdateServicesSectionAsync(dto);
            if (!result) return NotFound(new { message = "Hizmetler section alanı bulunamadı." });
            return Ok(new { message = "Hizmetler üst başlık alanı güncellendi." });
        }
    }
}
