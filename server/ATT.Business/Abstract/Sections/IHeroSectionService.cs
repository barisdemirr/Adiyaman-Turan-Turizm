using ATT.Business.DTOs.Sections.HeroSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Sections
{
    public interface IHeroSectionService
    {
        Task<HeroSectionDto> GetHeroSection();
    }
}
