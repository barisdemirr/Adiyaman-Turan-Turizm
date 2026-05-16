using ATT.Business.DTOs.ToursSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IToursSectionService
    {
        ToursSectionDto GetToursSection();
    }
}
