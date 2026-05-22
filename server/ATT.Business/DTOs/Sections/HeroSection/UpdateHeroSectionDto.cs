using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Sections.HeroSection
{
    public class UpdateHeroSectionDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Tag { get; set; }

        public Stream? ImageStream { get; set; }
        public string? ImageFileName { get; set; }
    }
}
