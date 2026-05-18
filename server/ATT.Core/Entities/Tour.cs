using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace ATT.Core.Entities
{
    public class Tour : BaseEntity
    {
        public string Title { get; set; } = default!;
        public string Slug { get; set; } = default!;
        public string ShortDescription { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string BannerImgUrl { get; set; } = default!;
        public string ImageUrl { get; set; } = default!; 
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } = default!;
        public string Duration { get; set; } = default!;
        public string Type { get; set; } = default!;


        public ICollection<TourDate> Dates { get; set; } = new List<TourDate>();
        public ICollection<TourExtra> Extras { get; set; } = new List<TourExtra>();
        public ICollection<Image> Images { get; set; } = new List<Image>();
    }
}
