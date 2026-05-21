using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.HeroSection;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class HeroSectionService : IHeroSectionService
    {
        private readonly IHeroSectionRepository _heroSectionRepository;
        public HeroSectionService(IHeroSectionRepository heroSectionRepository)
        {
            _heroSectionRepository = heroSectionRepository;
        }

        public async Task<HeroSectionDto> GetHeroSection() 
        {
            var hero = await _heroSectionRepository.GetSectionAsync();

            if (hero == null) { return null; }

            return new HeroSectionDto
            {
                Title = hero.Title,
                Description = hero.Description,
                Tag = hero.Tag,
                BackgroundImageUrl = hero.BackgroundImageUrl,
            };
        }
    }
}
