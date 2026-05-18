using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.GallerySection;
using ATT.Business.DTOs.ServicesSection;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class ServicesSectionService : IServicesSectionService
    {
        private readonly IServicesSectionRepository _servicesSectionRepository;
        public ServicesSectionService(IServicesSectionRepository servicesSectionRepository)
        {
            _servicesSectionRepository = servicesSectionRepository;
        }

        public async Task<ServicesSectionDto> GetServicesSection()
        {
            var services = await _servicesSectionRepository.GetSectionAsync();

            if (services == null) { return null; }

            return new ServicesSectionDto
            {
                Title = services.Title,
                Description = services.Description
            };
        }
    }
}
