using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.TourDate
{
    public class CreateTourDateDto
    {
        public int TourId { get; set; }
        public DateOnly Date { get; set; }
    }
}
