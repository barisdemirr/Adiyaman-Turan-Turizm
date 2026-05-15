using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Core.Entities
{
    public class TourDate : BaseEntity
    {
        public DateOnly Date { get; set; }
        public int TourId { get; set; }
        public Tour Tour { get; set; } = default!;
    }
}
