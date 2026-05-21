using ATT.Business.DTOs.Sections.GallerySection;
using ATT.Business.DTOs.Sections.ServicesSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Sections
{
    public interface IServicesSectionService
    {
        Task<ServicesSectionDto> GetServicesSection();
        Task<bool> UpdateServicesSectionAsync(UpdateServicesSectionDto dto);
    }
}
