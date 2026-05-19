using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ATT.DataAccess.Abstract.Common
{
    public interface IGenericRepository<T> where T : class
    {
        Task AddAsync(T entity);
        Task RemoveAsync(T entity);
        Task UpdateAsync(T entity);
        Task<List<T>> GetAllAsync();
        Task<T?> GetByFilterAsync(Expression<Func<T, bool>> filter);
        Task<List<T>> GetListByFilterAsync(Expression<Func<T, bool>> filter);
        Task<int> CountAsync();
    }
}
