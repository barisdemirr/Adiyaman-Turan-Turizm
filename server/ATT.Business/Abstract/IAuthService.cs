using ATT.Business.DTOs.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IAuthService
    {
        Task<string> LoginAsync(AdminLoginDto dto);
    }
}
