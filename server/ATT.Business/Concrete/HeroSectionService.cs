using ATT.Business.Abstract;
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
    public class HeroSectionService : IHeroSectionService
    {
        private readonly IHeroSectionRepository _heroSectionRepository;
        public HeroSectionService(IHeroSectionRepository heroSectionRepository)
        {
            _heroSectionRepository = heroSectionRepository;
        }

        public HeroSectionDto GetHeroSection() 
        {
            var hero = _heroSectionRepository.GetHero();

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
