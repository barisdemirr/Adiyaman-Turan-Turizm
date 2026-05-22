using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ATT.DataAccess.Concrete.EntityFramework.Repositories
{
    public class TourRepository : GenericRepository<Tour>, ITourRepository
    {
        public TourRepository(ATTDbContext context) : base(context)
        {
        }

        public async Task<List<Tour>> GetAllWithDetailsAsync()
        {
            return await _context.Tours
                .Include(t => t.Images) 
                .Include(t => t.Dates)   
                .Include(t => t.Extras) 
                .AsNoTracking()          
                .ToListAsync();
        }

        public async Task<Tour?> GetBySlugWithDetailsAsync(string slug)
        {
            return await _context.Tours
                .Include(t => t.Images) 
                .Include(t => t.Dates)   
                .Include(t => t.Extras)
                .AsNoTracking()          
                .FirstOrDefaultAsync(t => t.Slug == slug);
        }
        public async Task<Tour?> GetByIdWithDetailsAsync(int id)
        {
            return await _context.Tours
                .Include(t => t.Images) 
                .Include(t => t.Dates)   
                .Include(t => t.Extras)
                .AsNoTracking()          
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<TResult>> GetSelectedAsync<TResult>(Expression<Func<Tour, TResult>> selector)
        {
            return await _context.Tours
                .AsNoTracking()
                .Select(selector) 
                .ToListAsync();
        }
    }
}