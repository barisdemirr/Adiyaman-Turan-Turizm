using ATT.Core.Entities;
using ATT.DataAccess.Abstract;
using ATT.DataAccess.Concrete.EntityFramework.Context;
using ATT.DataAccess.Concrete.EntityFramework.Repositories.Common;
using Microsoft.EntityFrameworkCore;

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
    }
}