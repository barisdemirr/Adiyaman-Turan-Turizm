using ATT.Business.DTOs.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Sections.HeroSection
{
    public class HeroSectionDto : SectionBaseDto
    {
        public string Tag { get; set; }
        public string BackgroundImageUrl { get; set; }
    }
}
