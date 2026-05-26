using ATT.Business.Abstract;
using ATT.Business.DTOs.Admin;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IPasswordHasher<Admin> _passwordHasher;

        public AdminService(IAdminRepository adminRepository, IPasswordHasher<Admin> passwordHasher)
        {
            _adminRepository = adminRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<AdminDto?> GetAdminDetailsAsync(string username)
        {
            var admin = await _adminRepository.GetByFilterAsync(x => x.Username == username);

            return new AdminDto
            {
                Username = admin.Username,
                NameSurname = admin.NameSurname
            };
        }

        public async Task<bool> ChangePasswordAsync(AdminChangePasswordDto dto)
        {
            var admin = await _adminRepository.GetByFilterAsync(x => x.Username == dto.Username);
            if (admin == null) return false;

            var verificationResult = _passwordHasher.VerifyHashedPassword(admin, admin.PasswordHash, dto.CurrentPassword);
            if (verificationResult == PasswordVerificationResult.Failed) return false;

            admin.PasswordHash = _passwordHasher.HashPassword(admin, dto.NewPassword);

            await _adminRepository.UpdateAsync(admin);
            return true;
        }

        public async Task<bool> ChangeUsernameAsync(AdminChangeUsernameDto dto)
        {
            if (dto.CurrentUsername == dto.NewUsername) return true;

            var admin = await _adminRepository.GetByFilterAsync(x => x.Username == dto.CurrentUsername);
            if (admin == null) return false;

            var isUsernameTaken = await _adminRepository.GetByFilterAsync(x => x.Username == dto.NewUsername);
            if (isUsernameTaken != null) return false;

            admin.Username = dto.NewUsername;

            await _adminRepository.UpdateAsync(admin);
            return true;
        }

        public async Task<int> CountAdmins()
        {
            var number = await _adminRepository.CountAsync();

            return number;
        }
    }
}
