using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Tour
{
    public class TourImageCreationDto
    {
        public Stream FileStream { get; set; }
        public string FileName { get; set; }
        public bool IsInGallery { get; set; }
    }
}
