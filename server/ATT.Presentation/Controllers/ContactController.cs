using ATT.Business.Abstract;
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
    }
}
