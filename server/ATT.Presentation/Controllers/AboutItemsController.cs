using ATT.Business.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutItemsController : ControllerBase
    {
        private readonly IAboutItemService _aboutItemService;
        public AboutItemsController(IAboutItemService aboutItemService)
        {
            _aboutItemService = aboutItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAboutItems()
        {
            var aboutItemList = await _aboutItemService.GetAllAboutItems();
            return Ok(aboutItemList);
        }
    }
}
