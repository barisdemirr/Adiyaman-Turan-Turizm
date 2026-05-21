using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class AboutSectionService : IAboutSectionService
    {
        private readonly IAboutSectionRepository _aboutSectionRepository;
        public AboutSectionService(IAboutSectionRepository aboutSectionRepository)
        {
            _aboutSectionRepository = aboutSectionRepository;
        }

        public async Task<AboutSectionDto> GetAboutSection()
        {
            var about = await _aboutSectionRepository.GetSectionAsync();

            if (about == null) { return null; }

            return new AboutSectionDto
            {
                Title = about.Title,
                Description = about.Description
            };
        }


        public async Task<bool> UpdateAboutSectionAsync(UpdateAboutSectionDto dto)
        {
            var exists = await _aboutSectionRepository.GetSectionAsync();
            if (exists == null) return false;

            var entity = new AboutSection { Id = exists.Id, Title = dto.Title, Description = dto.Description };
            await _aboutSectionRepository.UpdateAsync(entity);
            return true;
        }
    }
}
