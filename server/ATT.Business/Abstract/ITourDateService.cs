using ATT.Business.DTOs.TourDate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface ITourDateService
    {
        Task<List<TourDateListDto>> GetDatesByTourIdAsync(int tourId);
        Task CreateTourDateAsync(CreateTourDateDto dto);
        Task DeleteTourDateAsync(int id);
    }
}
