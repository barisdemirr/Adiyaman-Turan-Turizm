using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.AboutSection;
using ATT.Business.DTOs.HeroSection;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class AboutSectionService : IAboutSectionService
    {
        private readonly IAboutSectionRepository _aboutSectionRepository;
        public AboutSectionService(IAboutSectionRepository aboutSectionRepository)
        {
            _aboutSectionRepository = aboutSectionRepository;
        }

        public async Task<AboutSectionDto> GetAboutSection()
        {
            var about = await _aboutSectionRepository.GetSectionAsync();

            if (about == null) { return null; }

            return new AboutSectionDto
            {
                Title = about.Title,
                Description = about.Description
            };
        }
    }
}
