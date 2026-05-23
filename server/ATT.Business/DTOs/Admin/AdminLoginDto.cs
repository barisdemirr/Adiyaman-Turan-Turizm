using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.DTOs.Admin
{
    public class AdminLoginDto
    {
        [Required(ErrorMessage = "Kullanıcı adı alanı boş geçilemez.")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "Şifre alanı boş geçilemez.")]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "Şifre en az 8, en fazla 16 karakter uzunluğunda olmalıdır.")]
        public string Password { get; set; } = null!;
    }
}
