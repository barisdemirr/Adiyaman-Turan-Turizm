using ATT.Business.Abstract;
using ATT.Business.DTOs.ContactInfo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactInfoService _contactInfoService;
        public ContactController(IContactInfoService contactInfoService)
        {
            _contactInfoService = contactInfoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContact() 
        {
            var contacts = await _contactInfoService.GetAllContactInfos();

            return Ok(contacts);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetAllContact(string name)
        {
            var contact = await _contactInfoService.GetContactByName(name);

            return Ok(contact);
        }

        [HttpPut("update-field")]
        public async Task<IActionResult> UpdateContactField([FromBody] UpdateContactFieldDto dto)
        {
            var result = await _contactInfoService.UpdateContactValueByNameAsync(dto);

            if (!result)
            {
                return NotFound(new { message = "Güncellenmek istenen iletişim kanalı bulunamadı." });
            }

            return Ok(new { message = "Alan başarıyla güncellendi." });
        }
    }
}
