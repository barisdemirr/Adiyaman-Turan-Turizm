using ATT.Business.Abstract;
using ATT.Business.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IHomePageService _homePageService;
        public HomeController(IHomePageService homePageService)
        {
            _homePageService = homePageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetHome()
        {
            var homePageData = await _homePageService.GetHomePage();

            return Ok(homePageData);
        }
    }
}
