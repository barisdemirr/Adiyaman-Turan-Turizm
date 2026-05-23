using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Core.Entities
{
    public class Admin : BaseEntity
    {
        public string NameSurname { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;
        public string Role { get; set; } = "Admin";
    }
}
