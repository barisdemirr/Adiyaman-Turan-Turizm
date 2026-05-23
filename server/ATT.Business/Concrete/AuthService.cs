using ATT.Business.Abstract;
using ATT.Business.DTOs.Admin;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract.Common;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class AuthService : IAuthService
    {
        private readonly IGenericRepository<Admin> _adminRepository;
        private readonly IPasswordHasher<Admin> _passwordHasher;
        private readonly IJwtService _jwtService;

        public AuthService(
            IGenericRepository<Admin> adminRepository,
            IPasswordHasher<Admin> passwordHasher,
            IJwtService jwtService)
        {
            _adminRepository = adminRepository;
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
        }

        public async Task<string?> LoginAsync(AdminLoginDto dto)
        {
            var admin = await _adminRepository.GetByFilterAsync(x => x.Username == dto.Username);
            if (admin == null) return null;

            var verificationResult = _passwordHasher.VerifyHashedPassword(admin, admin.PasswordHash, dto.Password);
            if (verificationResult != PasswordVerificationResult.Success) return null;

            return _jwtService.GenerateToken(admin.Username, admin.Role);
        }
    }
}
