using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.ContactSection;
using ATT.Business.DTOs.Sections.ServicesSection;
using ATT.Core.Entities;
using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections;
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

        public async Task<bool> UpdateServicesSectionAsync(UpdateServicesSectionDto dto)
        {
            var exists = await _servicesSectionRepository.GetSectionAsync();
            if (exists == null) return false;

            var entity = new ServicesSection { Id = exists.Id, Title = dto.Title, Description = dto.Description };
            await _servicesSectionRepository.UpdateAsync(entity);
            return true;
        }
    }
}
