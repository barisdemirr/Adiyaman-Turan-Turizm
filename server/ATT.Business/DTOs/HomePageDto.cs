using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.ContactSection;
using ATT.Business.DTOs.Sections.FavoritesSection;
using ATT.Business.DTOs.Sections.GallerySection;
using ATT.Business.DTOs.Sections.HeroSection;
using ATT.Business.DTOs.Sections.ServicesSection;
using ATT.Business.DTOs.Sections.ToursSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs
{
    public class HomePageDto
    {
        public HeroSectionDto HeroSection{ get; set; }
        public AboutSectionDto AboutSection{ get; set; }
        public ContactSectionDto ContactSection { get; set; }
        public FavoritesSectionDto FavoritesSection{ get; set; }
        public GallerySectionDto GallerySection{ get; set; }
        public ServicesSectionDto ServicesSection{ get; set; }
        public ToursSectionDto ToursSection{ get; set; }
    }
}
