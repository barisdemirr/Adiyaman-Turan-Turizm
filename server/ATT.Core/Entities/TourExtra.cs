using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Core.Entities
{
    public class TourExtra : BaseEntity
    {
        public string Title { get; set; } = default!;
        public string Description { get; set; }
        public int TourId { get; set; } = default!;
        public Tour Tour { get; set; } = default!;
    }
}
