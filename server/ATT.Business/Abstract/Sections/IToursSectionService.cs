using ATT.Business.DTOs.Sections.GallerySection;
using ATT.Business.DTOs.Sections.ToursSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Sections
{
    public interface IToursSectionService
    {
        Task<ToursSectionDto> GetToursSection();
        Task<bool> UpdateToursSectionAsync(UpdateToursSectionDto dto);
    }
}
