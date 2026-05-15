using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Core.Entities
{
    public class AboutItem : BaseEntity
    {
        public string Icon { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
    }
}
