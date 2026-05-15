using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories
{
    public class TourExtraRepository : GenericRepository<TourExtra>, ITourExtraRepository
    {
        public TourExtraRepository(ATTDbContext context) : base(context)
        {
        }
    }
}