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

        public async Task<List<ContactInfoDto>> GetAllContactInfos()
        {
            var list = await _contactInfoRepository.GetAllAsync();

            var contactInfos = list.Select(ci => new ContactInfoDto { Name = ci.Name, Value = ci.Value }).ToList();

            return contactInfos;
        }

        public async Task<ContactInfoDto> GetContactByName(string name)
        {
            var contact = await _contactInfoRepository.GetByFilterAsync(x => x.Name == name);

            return new ContactInfoDto
            {
                Name = contact.Name,
                Value = contact.Value
            };
        }
    }
}
