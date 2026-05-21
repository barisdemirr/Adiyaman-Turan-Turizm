using ATT.Business.DTOs.ContactInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IContactInfoService
    {
        Task<List<ContactInfoDto>> GetAllContactInfos();
        Task<ContactInfoDto> GetContactByName(string name);
        Task<bool> UpdateContactValueByNameAsync(UpdateContactFieldDto dto);
    }
}
