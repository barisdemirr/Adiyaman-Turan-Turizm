using ATT.Business.Abstract;
using ATT.Business.DTOs.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ATT.Presentation.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;
        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllServices()
        {
            var serviceList = await _serviceService.GetAllServices();
            return Ok(serviceList);
        }

        [HttpPost]
        public async Task<IActionResult> AddService([FromBody] CreateServiceItemDto dto)
        {
            var result = await _serviceService.AddServiceItemAsync(dto);

            if (!result)
            {
                return BadRequest(new { message = "Hizmet ekleme işlemi başarısız oldu." });
            }

            return Ok(new { message = "Yeni hizmet başarıyla eklendi." });
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetServiceById([FromRoute] int id)
        {
            var result = await _serviceService.GetServiceItemByIdAsync(id);
            if (result == null)
            {
                return NotFound(new { message = "Aradığın servis kartı bulunamadı." });
            }
            return Ok(result);
        }

        [HttpPut] 
        public async Task<IActionResult> UpdateService([FromBody] UpdateServiceDto dto)
        {
            var result = await _serviceService.UpdateServiceItemAsync(dto);
            if (!result)
            {
                return NotFound(new { message = "Güncellenmek istenen servis kartı bulunamadı." });
            }
            return Ok(new { message = "Servis kartı başarıyla güncellendi." });
        }

        [HttpDelete("{id}")] 
        public async Task<IActionResult> DeleteService([FromRoute] int id)
        {
            var result = await _serviceService.DeleteServiceItemAsync(id);

            if (!result)
            {
                return NotFound(new { message = "Silinmek istenen servis kartı bulunamadı." });
            }

            return Ok(new { message = "Servis kartı başarıyla silindi." });
        }
    }
}
