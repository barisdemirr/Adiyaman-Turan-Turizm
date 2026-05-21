using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.ContactSection;
using ATT.Business.DTOs.Sections.ToursSection;
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
    public class ToursSectionService : IToursSectionService
    {
        private readonly IToursSectionRepository _toursSectionRepository;
        public ToursSectionService(IToursSectionRepository toursSectionRepository)
        {
            _toursSectionRepository = toursSectionRepository;
        }

        public async Task<ToursSectionDto> GetToursSection()
        {
            var tours = await _toursSectionRepository.GetSectionAsync();

            if (tours == null) { return null; }

            return new ToursSectionDto
            {
                Title = tours.Title,
                Description = tours.Description
            };
        }

        public async Task<bool> UpdateToursSectionAsync(UpdateToursSectionDto dto)
        {
            var exists = await _toursSectionRepository.GetSectionAsync();
            if (exists == null) return false;

            var entity = new ToursSection { Id = exists.Id, Title = dto.Title, Description = dto.Description };
            await _toursSectionRepository.UpdateAsync(entity);
            return true;
        }
    }
}
