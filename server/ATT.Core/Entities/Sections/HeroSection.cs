using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Core.Entities.Sections
{
    public class HeroSection : SectionBase
    {
        public string Tag { get; set; } = default!;
        public string BackgroundImageUrl { get; set; } = default!;
    }
}
