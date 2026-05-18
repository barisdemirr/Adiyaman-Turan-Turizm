using ATT.Core.Entities.Common;
using ATT.DataAccess.Abstract.Common;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories.Common
{
    public class BaseSectionRepository<T> : GenericRepository<T>, IBaseSectionRepository<T> where T : BaseEntity
    {
        public BaseSectionRepository(ATTDbContext context) : base(context) { }
        public async Task<T?> GetSectionAsync()
        {
            return await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync();
        }
    }
}
