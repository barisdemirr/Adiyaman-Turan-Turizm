using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Common;

namespace ATT.DataAccess.Abstract
{
    public interface IGallerySectionRepository : IGenericRepository<GallerySection>
    {
        GallerySection GetGallerySection();
    }
}