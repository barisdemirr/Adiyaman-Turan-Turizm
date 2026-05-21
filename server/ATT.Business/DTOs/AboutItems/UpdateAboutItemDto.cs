using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.AboutItems
{
    public class UpdateAboutItemDto
    {
        public int Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
