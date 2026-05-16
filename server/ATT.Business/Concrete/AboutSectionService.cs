using ATT.Business.Abstract;
using ATT.Business.DTOs.AboutSection;
using ATT.Business.DTOs.HeroSection;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class AboutSectionService : IAboutSectionService
    {
        private readonly IAboutSectionRepository _aboutSectionRepository;
        public AboutSectionService(IAboutSectionRepository aboutSectionRepository)
        {
            _aboutSectionRepository = aboutSectionRepository;
        }

        public AboutSectionDto GetAboutSection()
        {
            var about = _aboutSectionRepository.GetAboutSection();

            if (about == null) { return null; }

            return new AboutSectionDto
            {
                Title = about.Title,
                Description = about.Description
            };
        }
    }
}
