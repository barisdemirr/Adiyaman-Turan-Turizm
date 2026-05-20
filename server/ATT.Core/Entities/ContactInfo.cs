using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Core.Entities
{
    public class ContactInfo : BaseEntity
    {
        public string Name { get; set; } = default!;
        public string Value { get; set; } = default!;
    }
}
