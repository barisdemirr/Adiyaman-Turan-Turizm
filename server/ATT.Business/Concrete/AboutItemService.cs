using ATT.Business.Abstract;
using ATT.Business.DTOs.AboutItems;
using ATT.Core.Entities;
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
                Id = ai.Id,
                Title = ai.Title,
                Description = ai.Description,
            }).ToList();

            return aboutItemList;
        }

        public async Task<AboutItemDto> GetAboutItemByIdAsync(int id)
        {
            var aboutItem = await _aboutItemRepository.GetByFilterAsync(x => x.Id == id);

            if (aboutItem == null)
            {
                return null;
            }

            return new AboutItemDto
            {
                Id = aboutItem.Id,
                Title = aboutItem.Title,
                Description = aboutItem.Description
            };
        }

        public async Task<bool> AddAboutItemAsync(CreateAboutItemDto dto)
        {
            var aboutItem = new AboutItem
            {
                Title = dto.Title,
                Description = dto.Description
            };

            await _aboutItemRepository.AddAsync(aboutItem);
            return true;
        }

        public async Task<bool> UpdateAboutItemAsync(UpdateAboutItemDto dto)
        {
            var exists = await _aboutItemRepository.GetByFilterAsync(x => x.Id == dto.Id);
            if (exists == null)
            {
                return false; 
            }

            var aboutItem = new AboutItem
            {
                Id = dto.Id,
                Title = dto.Title,
                Description = dto.Description
            };

            await _aboutItemRepository.UpdateAsync(aboutItem);
            return true;
        }

        public async Task<bool> DeleteAboutItemAsync(int id)
        {
            var aboutItem = await _aboutItemRepository.GetByFilterAsync(x => x.Id == id);
            if (aboutItem == null)
            {
                return false;
            }

            await _aboutItemRepository.RemoveAsync(aboutItem);
            return true;
        }
    }
}
