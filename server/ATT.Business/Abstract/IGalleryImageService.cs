using ATT.Business.DTOs.Image;
using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.GallerySection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IGalleryImageService
    {
        Task<List<ImageGalleryDto>> GetAllGalleryImages();
    }
}
