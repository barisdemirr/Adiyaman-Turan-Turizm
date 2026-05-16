using ATT.Business.DTOs.FavoritesSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IFavoritesSectionService
    {
        FavoritesSectionDto GetFavoritesSection();
    }
}
