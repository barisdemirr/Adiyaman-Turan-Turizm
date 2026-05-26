using ATT.Business.DTOs.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IServiceService
    {
        Task<List<ServiceDto>> GetAllServices();
        Task<bool> AddServiceItemAsync(CreateServiceItemDto dto);
        Task<ServiceDto> GetServiceItemByIdAsync(int id); 
        Task<bool> UpdateServiceItemAsync(UpdateServiceDto dto);
        Task<bool> DeleteServiceItemAsync(int id);
        Task<int> CountServices();
    }
}
