using ATT.Business.DTOs.Image;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Sections
{
    public interface IGalleryImageService
    {
        Task<List<ImageGalleryDto>> GetAllGalleryImages();
    }
}
