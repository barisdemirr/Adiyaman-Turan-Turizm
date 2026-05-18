using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Common;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections
{
    public class AboutSectionRepository : BaseSectionRepository<AboutSection>, IAboutSectionRepository
    {
        public AboutSectionRepository(ATTDbContext context) : base(context)
        {
        }

    }
}