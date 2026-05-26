using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Admin
{
    public class AdminChangeUsernameDto
    {
        public string CurrentUsername { get; set; } = null!;
        public string NewUsername { get; set; } = null!;
    }
}
