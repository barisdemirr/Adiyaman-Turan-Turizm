using ATT.Business.Abstract;
using ATT.Business.DTOs.Image;
using ATT.DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class GalleryImageService : IGalleryImageService
    {
        private readonly IImageRepository _imageRepository;
        public GalleryImageService(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        public async Task<List<ImageGalleryDto>> GetAllGalleryImages()
        {
            var images = await _imageRepository.GetListByFilterAsync(img => img.IsInGallery == true);

            var result = images.Select(img => new ImageGalleryDto
            {
                ImageUrl = img.ImageUrl
            }).ToList();

            return result;
        }
    }
}
