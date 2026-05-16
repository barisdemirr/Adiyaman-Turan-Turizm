using ATT.Core.Entities.Sections;
using ATT.DataAccess.Abstract.Common;

namespace ATT.DataAccess.Abstract
{
    public interface IHeroSectionRepository : IGenericRepository<HeroSection>
    {
        HeroSection GetHero();
    }
}