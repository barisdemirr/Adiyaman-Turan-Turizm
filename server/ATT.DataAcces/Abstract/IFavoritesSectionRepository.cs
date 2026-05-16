using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Common;

namespace ATT.DataAccess.Abstract
{
    public interface IFavoritesSectionRepository : IGenericRepository<FavoritesSection>
    {
        FavoritesSection GetFavoritesSection();
    }
}