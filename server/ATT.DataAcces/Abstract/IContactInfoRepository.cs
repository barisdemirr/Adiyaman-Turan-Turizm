using ATT.Core.Entities;
using ATT.DataAccess.Abstract.Common;
using System.Linq.Expressions;

namespace ATT.DataAccess.Abstract
{
    public interface IContactInfoRepository : IGenericRepository<ContactInfo>
    {
        Task<ContactInfo> GetAllContact();
    }
}