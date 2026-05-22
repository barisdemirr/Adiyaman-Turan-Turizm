using ATT.Business.Abstract;
using ATT.Business.DTOs.TourDate;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class TourDateService : ITourDateService
    {
        private readonly IGenericRepository<TourDate> _tourDateRepository;

        public TourDateService(IGenericRepository<TourDate> tourDateRepository)
        {
            _tourDateRepository = tourDateRepository;
        }

        public async Task<List<TourDateListDto>> GetDatesByTourIdAsync(int tourId)
        {
            var tourDates = await _tourDateRepository.GetListByFilterAsync(x => x.TourId == tourId);

            return tourDates.Select(x => new TourDateListDto
            {
                Id = x.Id,
                Date = x.Date,
            }).ToList();
        }

        public async Task CreateTourDateAsync(CreateTourDateDto dto)
        {
            var tourDate = new TourDate
            {
                TourId = dto.TourId,
                Date = dto.Date 
            };

            await _tourDateRepository.AddAsync(tourDate);
        }

        public async Task DeleteTourDateAsync(int id)
        {
            var tourDate = await _tourDateRepository.GetByFilterAsync(x => id == x.Id);
            if (tourDate == null)
                throw new Exception("Silinmek istenen tur tarihi sistemde bulunamadı.");

            await _tourDateRepository.RemoveAsync(tourDate);
        }
    }
}
