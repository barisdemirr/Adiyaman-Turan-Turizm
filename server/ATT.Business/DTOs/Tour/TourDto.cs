using ATT.Business.DTOs.Image;
using ATT.Business.DTOs.TourDate;
using ATT.Business.DTOs.TourExtra;
using ATT.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Tour
{
    public class TourDto
    {
        public string Title { get; set; }
        public string Slug { get; set; } 
        public string ShortDescription { get; set; } 
        public string Description { get; set; }
        public string BannerImgUrl { get; set; } 
        public string ImageUrl { get; set; } 
        public decimal Price { get; set; } 
        public string Duration { get; set; }
        public string Type { get; set; } 

        public ICollection<TourDateDto> Dates { get; set; }
        public ICollection<TourExtraDto> Extras { get; set; } 
        public ICollection<ImageDto> Images { get; set; } 
    }
}
