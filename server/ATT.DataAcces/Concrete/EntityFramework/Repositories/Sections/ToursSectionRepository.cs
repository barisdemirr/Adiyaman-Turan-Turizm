using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections
{
    public class ToursSectionRepository : BaseSectionRepository<ToursSection>, IToursSectionRepository
    {
        public ToursSectionRepository(ATTDbContext context) : base(context)
        {
        }

    }
}