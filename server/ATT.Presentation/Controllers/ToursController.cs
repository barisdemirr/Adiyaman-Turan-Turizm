using ATT.Business.Abstract;
using ATT.Business.DTOs.Tour;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        private readonly ITourService _tourService;
        public ToursController(ITourService tourService)
        {
            _tourService = tourService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTours()
        {
            var tourList = await _tourService.GetAllTours();

            return Ok(tourList);
        }
    }
}
