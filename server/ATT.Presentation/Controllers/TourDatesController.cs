using ATT.Business.Abstract;
using ATT.Business.DTOs.TourDate;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourDatesController : ControllerBase
    {
        private readonly ITourDateService _tourDateService;

        public TourDatesController(ITourDateService tourDateService)
        {
            _tourDateService = tourDateService;
        }

        [HttpGet("{tourId:int}")]
        public async Task<IActionResult> GetDatesByTourId(int tourId)
        {
            var dates = await _tourDateService.GetDatesByTourIdAsync(tourId);

            return Ok(dates);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTourDateDto dto)
        {
            await _tourDateService.CreateTourDateAsync(dto);

            return Ok(new { message = "Yeni tur tarihi başarıyla sisteme mühürlendi!" });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _tourDateService.DeleteTourDateAsync(id);
            return Ok(new { message = "Seçilen tarih başarıyla silindi!" });
        }
    }
}
