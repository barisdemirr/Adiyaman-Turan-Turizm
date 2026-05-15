using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories
{
    public class FavoritesSectionRepository : GenericRepository<FavoritesSection>, IFavoritesSectionRepository
    {
        public FavoritesSectionRepository(ATTDbContext context) : base(context)
        {
        }
    }
}