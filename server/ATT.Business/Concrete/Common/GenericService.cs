using ATT.Business.Abstract.Common;
using ATT.Core.Entities.Common;
using ATT.DataAccess.Abstract.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete.Common
{
    public class GenericService<T> : IGenericService<T> where T : BaseEntity
    {
        private readonly IGenericRepository<T> _repository;

        public GenericService(IGenericRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task TAddAsync(T entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task TRemoveAsync(T entity)
        {
            await _repository.RemoveAsync(entity);
        }

        public async Task TUpdateAsync(T entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task<List<T>> TGetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<T?> TGetByFilterAsync(Expression<Func<T, bool>> filter)
        {
            return await _repository.GetByFilterAsync(filter);
        }

        public async Task<int> TCountAsync()
        {
            return await _repository.CountAsync();
        }
    }
}
