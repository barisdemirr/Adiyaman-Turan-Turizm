using ATT.Business.Abstract;
using ATT.Business.DTOs.Service;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRepository;
        public ServiceService(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        public async Task<List<ServiceDto>> GetAllServices()
        {
            var ServiceService = await _serviceRepository.GetAllAsync();

            var ServiceList = ServiceService.Select(s => new ServiceDto
            {
                Id = s.Id,
                Title = s.Title,
                Description = s.Description,
                Icon = s.Icon
            }).ToList();

            return ServiceList;
        }

        public async Task<bool> AddServiceItemAsync(CreateServiceItemDto dto)
        {
            var serviceItem = new Service
            {
                Title = dto.Title,
                Description = dto.Description,
                Icon = dto.Icon
            };

            await _serviceRepository.AddAsync(serviceItem); 
            return true;
        }

        public async Task<ServiceDto> GetServiceItemByIdAsync(int id)
        {
            var serviceItem = await _serviceRepository.GetByFilterAsync(x => x.Id == id);
            if (serviceItem == null) return null;

            return new ServiceDto
            {
                Id = serviceItem.Id,
                Title = serviceItem.Title,
                Description = serviceItem.Description,
                Icon = serviceItem.Icon
            };
        }

        public async Task<bool> UpdateServiceItemAsync(UpdateServiceDto dto)
        {
            var exists = await _serviceRepository.GetByFilterAsync(x => x.Id == dto.Id);
            if (exists == null) return false;

            var serviceItem = new Service
            {
                Id = dto.Id,
                Title = dto.Title,
                Description = dto.Description,
                Icon = dto.Icon
            };

            await _serviceRepository.UpdateAsync(serviceItem);
            return true;
        }

        public async Task<bool> DeleteServiceItemAsync(int id)
        {
            var serviceItem = await _serviceRepository.GetByFilterAsync(x => x.Id == id);
            if (serviceItem == null)
            {
                return false;
            }

            await _serviceRepository.RemoveAsync(serviceItem); 
            return true;
        }
    }
}
