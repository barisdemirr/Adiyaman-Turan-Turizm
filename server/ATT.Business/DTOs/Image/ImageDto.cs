using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Image
{
    public class ImageDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public bool IsInGallery { get; set; }
    }
}
