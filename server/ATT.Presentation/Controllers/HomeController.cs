using ATT.Business.Abstract;
using ATT.Business.Concrete;
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
        public IActionResult GetHome()
        {
            var homePageData = _homePageService.GetHomePage();

            return Ok(homePageData);
        }
    }
}
