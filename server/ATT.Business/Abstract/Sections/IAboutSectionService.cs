using ATT.Business.DTOs.AboutSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Sections
{
    public interface IAboutSectionService
    {
        Task<AboutSectionDto> GetAboutSection();
    }
}
