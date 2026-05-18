using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.ServicesSection;
using ATT.Business.DTOs.ToursSection;
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
    }
}
