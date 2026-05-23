using ATT.Business.Abstract.Sections;
using ATT.Business.Concrete.Sections;
using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.ContactSection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers.Sections
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactSectionController : ControllerBase
    {
        private readonly IContactSectionService _contactSectionService;

        public ContactSectionController(IContactSectionService contactSectionService)
        {
            _contactSectionService = contactSectionService;
        }

        [HttpGet] 
        public async Task<IActionResult> GetContactSection()
        {
            var result = await _contactSectionService.GetContactSection(); 

            if (result == null)
            {
                return NotFound(new { message = "İletişim bilgisi bulunamadı." });
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateContactSectionDto dto)
        {
            var result = await _contactSectionService.UpdateContactSectionAsync(dto);
            if (!result) return NotFound(new { message = "İletişim section alanı bulunamadı." });
            return Ok(new { message = "İletişim üst başlık alanı güncellendi." });
        }
    }
}
