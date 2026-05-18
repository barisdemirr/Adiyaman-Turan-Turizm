using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections
{
    public class ContactSectionRepository : BaseSectionRepository<ContactSection>, IContactSectionRepository
    {
        public ContactSectionRepository(ATTDbContext context) : base(context)
        {
        }

    }
}