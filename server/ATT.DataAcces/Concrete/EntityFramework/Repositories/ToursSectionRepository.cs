using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories
{
    public class ToursSectionRepository : GenericRepository<ToursSection>, IToursSectionRepository
    {
        public ToursSectionRepository(ATTDbContext context) : base(context)
        {
        }

        public ToursSection GetToursSection()
        {
            return _context.ToursSections.FirstOrDefault();
        }
    }
}