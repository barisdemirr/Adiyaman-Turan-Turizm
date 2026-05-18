using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.AboutSection;
using ATT.Business.DTOs.ContactSection;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class ContactSectionService : IContactSectionService
    {
        private readonly IContactSectionRepository _contactSectionRepository;
        public ContactSectionService(IContactSectionRepository contactSectionRepository)
        {
            _contactSectionRepository = contactSectionRepository;
        }

        public async Task<ContactSectionDto> GetContactSection()
        {
            var contact = await _contactSectionRepository.GetSectionAsync();

            if (contact == null) { return null; }

            return new ContactSectionDto
            {
                Title = contact.Title,
                Description = contact.Description
            };
        }
    }
}
