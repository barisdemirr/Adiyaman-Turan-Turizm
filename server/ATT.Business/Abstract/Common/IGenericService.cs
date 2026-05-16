using ATT.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract.Common
{
    public interface IGenericService<T> where T : BaseEntity
    {
        Task TAddAsync(T entity);
        Task TRemoveAsync(T entity);
        Task TUpdateAsync(T entity);
        Task<List<T>> TGetAllAsync();
        Task<T?> TGetByFilterAsync(Expression<Func<T, bool>> filter);
        Task<int> TCountAsync();
    }
}
