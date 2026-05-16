using ATT.Business.Abstract;
using ATT.Business.DTOs.AboutSection;
using ATT.Business.DTOs.ContactSection;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class ContactSectionService : IContactSectionService
    {
        private readonly IContactSectionRepository _contactSectionRepository;
        public ContactSectionService(IContactSectionRepository contactSectionRepository)
        {
            _contactSectionRepository = contactSectionRepository;
        }

        public ContactSectionDto GetContactSection()
        {
            var contact = _contactSectionRepository.GetContactSection();

            if (contact == null) { return null; }

            return new ContactSectionDto
            {
                Title = contact.Title,
                Description = contact.Description
            };
        }
    }
}
