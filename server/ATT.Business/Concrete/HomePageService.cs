using ATT.Business.Abstract;
using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class HomePageService : IHomePageService
    {
        private readonly IHeroSectionService _heroSectionService;
        private readonly IAboutSectionService _aboutSectionService;
        private readonly IContactSectionService _contactSectionService;
        private readonly IGallerySectionService _gallerySectionService;
        private readonly IFavoritesSectionService _favoritesSectionService;
        private readonly IServicesSectionService _servicesSectionService;
        private readonly IToursSectionService _toursSectionService;

        public HomePageService(IHeroSectionService heroSectionService, IAboutSectionService aboutSectionService,
            IContactSectionService contactSectionService, IGallerySectionService gallerySectionService,
            IFavoritesSectionService favoritesSectionService, IServicesSectionService servicesSectionService, IToursSectionService toursSectionService)
        {
            _heroSectionService = heroSectionService;
            _aboutSectionService = aboutSectionService;
            _contactSectionService = contactSectionService;
            _gallerySectionService = gallerySectionService;
            _favoritesSectionService = favoritesSectionService;
            _servicesSectionService = servicesSectionService;
            _toursSectionService = toursSectionService;
        }

        public async Task<HomePageDto> GetHomePage()
        {

            var HeroSection = await _heroSectionService.GetHeroSection();
            var AboutSection = await _aboutSectionService.GetAboutSection();
            var ContactSection = await _contactSectionService.GetContactSection();
            var FavoritesSection = await _favoritesSectionService.GetFavoritesSection();
            var ToursSection = await _toursSectionService.GetToursSection();
            var GallerySection = await _gallerySectionService.GetGallerySection();
            var ServicesSection = await _servicesSectionService.GetServicesSection();


            return new HomePageDto
            {
                HeroSection = HeroSection,
                AboutSection = AboutSection,
                ContactSection = ContactSection,
                FavoritesSection = FavoritesSection,
                ServicesSection = ServicesSection,
                ToursSection = ToursSection,
                GallerySection = GallerySection,
            };
        }
    }
}
