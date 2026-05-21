using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.ContactSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Sections
{
    public interface IContactSectionService
    {
        Task<ContactSectionDto> GetContactSection();
        Task<bool> UpdateContactSectionAsync(UpdateContactSectionDto dto);
    }
}
