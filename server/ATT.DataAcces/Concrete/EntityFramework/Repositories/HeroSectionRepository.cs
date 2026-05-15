using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories
{
    public class HeroSectionRepository : GenericRepository<HeroSection>, IHeroSectionRepository
    {
        public HeroSectionRepository(ATTDbContext context) : base(context)
        {
        }
    }
}