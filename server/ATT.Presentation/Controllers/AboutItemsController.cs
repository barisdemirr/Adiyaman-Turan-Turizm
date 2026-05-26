using ATT.Business.Abstract;
using ATT.Business.DTOs.AboutItems;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace ATT.Presentation.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AboutItemsController : ControllerBase
    {
        private readonly IAboutItemService _aboutItemService;
        public AboutItemsController(IAboutItemService aboutItemService)
        {
            _aboutItemService = aboutItemService;
        }

        [AllowAnonymous]
        [HttpGet]
        [EnableRateLimiting("PublicGetPolicy")]
        public async Task<IActionResult> GetAllAboutItems()
        {
            var aboutItemList = await _aboutItemService.GetAllAboutItems();
            return Ok(aboutItemList);
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetAboutItemById([FromRoute] int id)
        {
            var result = await _aboutItemService.GetAboutItemByIdAsync(id);

            if (result == null)
            {
                return NotFound(new { message = "Aradığınız hakkımızda kartı bulunamadı." });
            }

            return Ok(result);
        }

        [HttpPost] // ADD
        public async Task<IActionResult> AddAboutItem([FromBody] CreateAboutItemDto dto)
        {
            var result = await _aboutItemService.AddAboutItemAsync(dto);

            if (!result)
            {
                return BadRequest(new { message = "Ekleme işlemi başarısız oldu." });
            }

            return Ok(new { message = "About item başarıyla eklendi." });
        }

        [HttpPut] // UPDATE
        public async Task<IActionResult> UpdateAboutItem([FromBody] UpdateAboutItemDto dto)
        {
            var result = await _aboutItemService.UpdateAboutItemAsync(dto);

            if (!result)
            {
                return NotFound(new { message = "Güncellenmek istenen hakkımızda kartı bulunamadı." });
            }

            return Ok(new { message = "Hakkımızda kartı başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAboutItem([FromRoute] int id)
        {
            var result = await _aboutItemService.DeleteAboutItemAsync(id);

            if (!result)
            {
                return NotFound(new { message = "Silinmek istenen hakkımızda kartı bulunamadı." });
            }

            return Ok(new { message = "Hakkımızda kartı başarıyla silindi." });
        }
    }
}
