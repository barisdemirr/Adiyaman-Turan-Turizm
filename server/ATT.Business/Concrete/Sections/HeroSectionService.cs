using ATT.Business.Abstract;
using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.Sections.HeroSection;
using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class HeroSectionService : IHeroSectionService
    {
        private readonly IHeroSectionRepository _heroSectionRepository;
        private readonly IImageService _imageService;
        public HeroSectionService(IHeroSectionRepository heroSectionRepository, IImageService imageService)
        {
            _heroSectionRepository = heroSectionRepository;
            _imageService = imageService;
        }

        public async Task<HeroSectionDto> GetHeroSection() 
        {
            var hero = await _heroSectionRepository.GetSectionAsync();

            if (hero == null) { return null; }

            return new HeroSectionDto
            {
                Title = hero.Title,
                Description = hero.Description,
                Tag = hero.Tag,
                BackgroundImageUrl = hero.BackgroundImageUrl,
            };
        }


        public async Task<bool> UpdateHeroSectionAsync(UpdateHeroSectionDto dto)
        {
            var hero = await _heroSectionRepository.GetSectionAsync();
            if (hero == null) return false;

            hero.Title = dto.Title;
            hero.Description = dto.Description;
            hero.Tag = dto.Tag;


            if (dto.ImageStream != null && !string.IsNullOrEmpty(dto.ImageFileName))
            {
                DeletePhysicalFile(hero.BackgroundImageUrl);

                string newImagePath = await _imageService.ScaleAndUploadImageAsync(dto.ImageStream, dto.ImageFileName, "hero", 1080);

                hero.BackgroundImageUrl = newImagePath;
            }

            await _heroSectionRepository.UpdateAsync(hero);
            return true;
        }

        private void DeletePhysicalFile(string? relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath)) return;

            try
            {
                var cleanPath = relativePath.StartsWith("/") ? relativePath.Substring(1) : relativePath;

                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", cleanPath);

                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }
            }
            catch (Exception)
            {

            }
        }
    }
}
