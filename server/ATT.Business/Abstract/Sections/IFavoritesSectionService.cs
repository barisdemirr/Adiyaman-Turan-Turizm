using ATT.Business.DTOs.Sections.AboutSection;
using ATT.Business.DTOs.Sections.FavoritesSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Sections
{
    public interface IFavoritesSectionService
    {
        Task<FavoritesSectionDto> GetFavoritesSection();
        Task<bool> UpdateFavoritesSectionAsync(UpdateFavoritesSectionDto dto);
    }
}
