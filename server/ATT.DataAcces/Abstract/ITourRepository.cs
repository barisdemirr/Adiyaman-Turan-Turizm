using ATT.Core.Entities;
using ATT.DataAccess.Abstract.Common;

namespace ATT.DataAccess.Abstract
{
    public interface ITourRepository : IGenericRepository<Tour>
    {
        Task<List<Tour>> GetAllWithDetailsAsync();
    }
}