using ATT.Business.Abstract;
using ATT.Business.DTOs.GallerySection;
using ATT.Business.DTOs.ServicesSection;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class ServicesSectionService : IServicesSectionService
    {
        private readonly IServicesSectionRepository _servicesSectionRepository;
        public ServicesSectionService(IServicesSectionRepository servicesSectionRepository)
        {
            _servicesSectionRepository = servicesSectionRepository;
        }

        public ServicesSectionDto GetServicesSection()
        {
            var services = _servicesSectionRepository.GetServicesSection();

            if (services == null) { return null; }

            return new ServicesSectionDto
            {
                Title = services.Title,
                Description = services.Description
            };
        }
    }
}
