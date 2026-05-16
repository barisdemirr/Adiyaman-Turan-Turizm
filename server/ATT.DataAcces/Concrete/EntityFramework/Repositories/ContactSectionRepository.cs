using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories
{
    public class ContactSectionRepository : GenericRepository<ContactSection>, IContactSectionRepository
    {
        public ContactSectionRepository(ATTDbContext context) : base(context)
        {
        }

        public ContactSection GetContactSection()
        {
            return _context.ContactSections.FirstOrDefault();
        }
    }
}