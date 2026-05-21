using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.ContactSection;
using ATT.Business.DTOs.Sections.GallerySection;
using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class GallerySectionService : IGallerySectionService
    {
        private readonly IGallerySectionRepository _gallerySectionRepository;
        public GallerySectionService(IGallerySectionRepository gallerySectionRepository)
        {
            _gallerySectionRepository = gallerySectionRepository;
        }

        public async Task<GallerySectionDto> GetGallerySection()
        {
            var gallery = await _gallerySectionRepository.GetSectionAsync();

            if (gallery == null) { return null; }

            return new GallerySectionDto
            {
                Title = gallery.Title,
                Description = gallery.Description
            };
        }

        public async Task<bool> UpdateGallerySectionAsync(UpdateGallerySectionDto dto)
        {
            var exists = await _gallerySectionRepository.GetSectionAsync();
            if (exists == null) return false;

            var entity = new GallerySection { Id = exists.Id, Title = dto.Title, Description = dto.Description };
            await _gallerySectionRepository.UpdateAsync(entity);
            return true;
        }
    }
}
