using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories.Sections
{
    public class GallerySectionRepository : BaseSectionRepository<GallerySection>, IGallerySectionRepository
    {
        public GallerySectionRepository(ATTDbContext context) : base(context)
        {
        }

    }
}