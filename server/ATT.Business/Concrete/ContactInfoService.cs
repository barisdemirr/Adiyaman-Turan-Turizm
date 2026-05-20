using ATT.Business.Abstract;
using ATT.Business.DTOs.ContactInfo;
using ATT.DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class ContactInfoService : IContactInfoService
    {
        private readonly IContactInfoRepository _contactInfoRepository;
        public ContactInfoService(IContactInfoRepository contactInfoRepository)
        {
            _contactInfoRepository = contactInfoRepository;
        }

        public async Task<ContactInfoDto> GetAllContactInfos()
        {
            var contact = await _contactInfoRepository.GetAllContact();


            return new ContactInfoDto
            {
                InstagramUsername = contact.InstagramUsername,
                WhatsappPhone = contact.WhatsappPhone,
                Phone = contact.Phone,
                Email = contact.Email
            };
        }
    }
}
