using ATT.Business.Abstract;
using ATT.Business.DTOs.FavoritesSection;
using ATT.Business.DTOs.GallerySection;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class GallerySectionService : IGallerySectionService
    {
        private readonly IGallerySectionRepository _gallerySectionRepository;
        public GallerySectionService(IGallerySectionRepository gallerySectionRepository)
        {
            _gallerySectionRepository = gallerySectionRepository;
        }

        public GallerySectionDto GetGallerySection()
        {
            var gallery = _gallerySectionRepository.GetGallerySection();

            if (gallery == null) { return null; }

            return new GallerySectionDto
            {
                Title = gallery.Title,
                Description = gallery.Description
            };
        }
    }
}
