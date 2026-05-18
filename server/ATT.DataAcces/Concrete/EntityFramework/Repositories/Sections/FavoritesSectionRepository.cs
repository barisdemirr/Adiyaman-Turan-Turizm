using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections
{
    public class FavoritesSectionRepository : BaseSectionRepository<FavoritesSection>, IFavoritesSectionRepository
    {
        public FavoritesSectionRepository(ATTDbContext context) : base(context)
        {
        }

    }
}