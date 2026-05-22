using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Tour
{
    public class CreateTourDto
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Duration { get; set; }
        public string Category { get; set; }
        public Stream BannerStream { get; set; }
        public string BannerFileName { get; set; }
        public Stream MainStream { get; set; }
        public string MainFileName { get; set; }
        public List<TourImageCreationDto> Images { get; set; } = new();
    }
}
