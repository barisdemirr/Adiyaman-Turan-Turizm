using ATT.Business.DTOs.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IAdminService
    {
        Task<AdminDto?> GetAdminDetailsAsync(string username);
        Task<bool> ChangePasswordAsync(AdminChangePasswordDto dto);
        Task<bool> ChangeUsernameAsync(AdminChangeUsernameDto dto);
        Task<int> CountAdmins();
    }
}
