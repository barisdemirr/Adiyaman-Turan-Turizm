using ATT.Business.Abstract;
using ATT.Business.Concrete;
using ATT.Business.DTOs.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("details/{username}")]
        public async Task<IActionResult> GetDetails(string username)
        {
            var result = await _adminService.GetAdminDetailsAsync(username);
            if (result == null)
            {
                return NotFound(new { message = "Admin account not found." });
            }

            return Ok(result);
        }

        [HttpPost("change-password")]
        [EnableRateLimiting("StrictLoginPolicy")]
        public async Task<IActionResult> ChangePassword([FromBody] AdminChangePasswordDto dto)
        {
            var result = await _adminService.ChangePasswordAsync(dto);
            if (!result)
            {
                return BadRequest(new { message = "Geçersiz şifre!" });
            }

            return Ok(new { message = "Şifre başarıyla güncellendi" });
        }

        [HttpPost("change-username")]
        public async Task<IActionResult> ChangeUsername([FromBody] AdminChangeUsernameDto dto)
        {
            var result = await _adminService.ChangeUsernameAsync(dto);
            if (!result)
            {
                return BadRequest(new { message = "Güncelleme başarısız, kontrol sağlayıp tekrar deneyin!" });
            }

            return Ok(new { message = "Kullanıcı adı güncellendi!" });
        }

        [HttpGet("adminsnumber")]
        public async Task<IActionResult> GetAdminsNumber()
        {
            var res = await _adminService.CountAdmins();

            return Ok(res);
        }
    }
}
