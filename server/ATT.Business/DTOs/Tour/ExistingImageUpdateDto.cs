using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Tour
{
    public class ExistingImageUpdateDto
    {
        public int Id { get; set; }
        public bool IsInGallery { get; set; }
        public bool IsDeleted { get; set; }
    }
}
