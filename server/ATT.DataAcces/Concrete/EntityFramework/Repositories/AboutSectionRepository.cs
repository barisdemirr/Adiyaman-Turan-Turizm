using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories
{
    public class AboutSectionRepository : GenericRepository<AboutSection>, IAboutSectionRepository
    {
        public AboutSectionRepository(ATTDbContext context) : base(context)
        {
        }
    }
}