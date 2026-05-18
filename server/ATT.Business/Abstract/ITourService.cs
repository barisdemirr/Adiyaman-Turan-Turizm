using ATT.Business.DTOs.Tour;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface ITourService
    {
        Task<List<TourDto>> GetAllTours();
        Task<TourDto> GetTourBySlugAsync(string slug);
        Task<List<TourReservationDto>> GetToursForReservationAsync();
    }
}
