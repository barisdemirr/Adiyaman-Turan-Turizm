using ATT.Business.Abstract;
using ATT.Business.DTOs.AboutItems;
using ATT.DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class AboutItemService : IAboutItemService
    {
        private readonly IAboutItemRepository _aboutItemRepository;
        public AboutItemService(IAboutItemRepository aboutItemRepository)
        {
            _aboutItemRepository = aboutItemRepository;
        }

        public async Task<List<AboutItemDto>> GetAllAboutItems()
        {
            var aboutItems = await _aboutItemRepository.GetAllAsync();

            var aboutItemList = aboutItems.Select(ai => new AboutItemDto
            {
                Title = ai.Title,
                Description = ai.Description,
            }).ToList();

            return aboutItemList;
        }
    }
}
