using ATT.Business.DTOs.TourDate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Tour
{
    public class TourReservationDto
    {
        public string Title { get; set; }
        public string Slug { get; set; }
        public ICollection<TourDateDto> Dates { get; set; } 
    }
}
