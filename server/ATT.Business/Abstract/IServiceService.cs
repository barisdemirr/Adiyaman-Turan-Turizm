using ATT.Business.DTOs.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IServiceService
    {
        Task<List<ServiceDto>> GetAllServices();
    }
}
