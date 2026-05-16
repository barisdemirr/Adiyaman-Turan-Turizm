using ATT.Business.Abstract;
using ATT.Business.DTOs.ContactSection;
using ATT.Business.DTOs.FavoritesSection;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class FavoritesSectionService : IFavoritesSectionService
    {
        private readonly IFavoritesSectionRepository _favoritesSectionRepository;
        public FavoritesSectionService(IFavoritesSectionRepository favoritesSectionRepository)
        {
            _favoritesSectionRepository = favoritesSectionRepository;
        }

        public FavoritesSectionDto GetFavoritesSection()
        {
            var favorites = _favoritesSectionRepository.GetFavoritesSection();

            if (favorites == null) { return null; }

            return new FavoritesSectionDto
            {
                Title = favorites.Title,
                Description = favorites.Description
            };
        }
    }
}
