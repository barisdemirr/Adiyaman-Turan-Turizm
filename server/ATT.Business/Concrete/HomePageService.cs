using ATT.Business.Abstract;
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

        public HomePageDto GetHomePage()
        {
            return new HomePageDto
            {
                HeroSection = _heroSectionService.GetHeroSection(),
                AboutSection = _aboutSectionService.GetAboutSection(),
                ContactSection = _contactSectionService.GetContactSection(),
                FavoritesSection = _favoritesSectionService.GetFavoritesSection(),
                ToursSection = _toursSectionService.GetToursSection(),
                GallerySection = _gallerySectionService.GetGallerySection(),
                ServicesSection = _servicesSectionService.GetServicesSection(),
            };
        }
    }
}
