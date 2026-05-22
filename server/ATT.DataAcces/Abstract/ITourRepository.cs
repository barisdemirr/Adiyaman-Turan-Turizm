using ATT.Core.Entities;
using ATT.DataAccess.Abstract.Common;
using System.Linq.Expressions;

namespace ATT.DataAccess.Abstract
{
    public interface ITourRepository : IGenericRepository<Tour>
    {
        Task<List<Tour>> GetAllWithDetailsAsync();
        Task<Tour?> GetBySlugWithDetailsAsync(string slug);
        Task<Tour?> GetByIdWithDetailsAsync(int id);
        Task<List<TResult>> GetSelectedAsync<TResult>(Expression<Func<Tour, TResult>> selector);
    }
}