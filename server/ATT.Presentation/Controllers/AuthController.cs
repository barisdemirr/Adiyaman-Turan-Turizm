using ATT.Business.Abstract;
using ATT.Business.DTOs.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AdminLoginDto dto)
        {
            var token = await _authService.LoginAsync(dto);

            if (token == null)
                return BadRequest(new { message = "Kullanıcı adı veya şifre hatalı." });

            return Ok(new
            {
                token = token,
                username = dto.Username,
                message = "Giriş başarılı!"
            });
        }
    }
}
