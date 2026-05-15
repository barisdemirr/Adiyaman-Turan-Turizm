using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Core.Entities
{
    public class Image : BaseEntity
    {
        public string ImageUrl { get; set; } = default!;
        public bool IsInGallery { get; set; }
        public int? TourId { get; set; }
        public Tour? Tour { get; set; }
    }
}
