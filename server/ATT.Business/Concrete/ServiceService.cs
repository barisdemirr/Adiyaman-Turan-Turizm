using ATT.Business.Abstract;
using ATT.Business.DTOs.Service;
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
                Title = s.Title,
                Description = s.Description,
                Icon = s.Icon
            }).ToList();

            return ServiceList;
        }
    }
}
