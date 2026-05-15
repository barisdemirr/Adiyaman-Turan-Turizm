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
        public string WhatsappPhone { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string InstagramUsername { get; set; }
    }
}
