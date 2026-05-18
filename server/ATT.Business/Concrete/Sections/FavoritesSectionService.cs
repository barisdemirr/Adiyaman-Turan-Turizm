using ATT.Business.Abstract.Sections;
using ATT.Business.DTOs.ContactSection;
using ATT.Business.DTOs.FavoritesSection;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Sections
{
    public class FavoritesSectionService : IFavoritesSectionService
    {
        private readonly IFavoritesSectionRepository _favoritesSectionRepository;
        public FavoritesSectionService(IFavoritesSectionRepository favoritesSectionRepository)
        {
            _favoritesSectionRepository = favoritesSectionRepository;
        }

        public async Task<FavoritesSectionDto> GetFavoritesSection()
        {
            var favorites = await _favoritesSectionRepository.GetSectionAsync();

            if (favorites == null) { return null; }

            return new FavoritesSectionDto
            {
                Title = favorites.Title,
                Description = favorites.Description
            };
        }
    }
}
