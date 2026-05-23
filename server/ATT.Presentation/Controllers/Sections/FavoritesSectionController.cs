using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.FavoritesSection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers.Sections
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesSectionController : ControllerBase
    {
        private readonly IFavoritesSectionService _favoritesSectionService;

        public FavoritesSectionController(IFavoritesSectionService favoritesSectionService)
        {
            _favoritesSectionService = favoritesSectionService;
        }

        [HttpGet] 
        public async Task<IActionResult> GetFavoritesSection()
        {
            var result = await _favoritesSectionService.GetFavoritesSection();

            if (result == null)
            {
                return NotFound(new { message = "Popüler rotalar üst başlık bilgisi bulunamadı." });
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateFavoritesSectionDto dto)
        {
            var result = await _favoritesSectionService.UpdateFavoritesSectionAsync(dto);
            if (!result) return NotFound(new { message = "Favoriler section alanı bulunamadı." });
            return Ok(new { message = "Favoriler üst başlık alanı güncellendi." });
        }
    }
}
