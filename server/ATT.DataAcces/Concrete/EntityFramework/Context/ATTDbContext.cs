using ATT.Core.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace ATT.DataAccess.Concrete.EntityFramework.Context
{
    public class ATTDbContext : DbContext
    {
        public ATTDbContext(DbContextOptions<ATTDbContext> options) : base(options) { }

        public DbSet<Core.Entities.AboutItem> AboutItems { get; set; }
        public DbSet<Core.Entities.Image> Images { get; set; }
        public DbSet<Core.Entities.Tour> Tours { get; set; }
        public DbSet<Core.Entities.TourDate> TourDates { get; set; }
        public DbSet<Core.Entities.TourExtra> TourExtras { get; set; }
        public DbSet<Core.Entities.Service> Services { get; set; }
        public DbSet<Core.Entities.ContactInfo> ContactInfos { get; set; }
        public DbSet<Core.Entities.Sections.HeroSection> HeroSections { get; set; }
        public DbSet<Core.Entities.Sections.AboutSection> AboutSections { get; set; }
        public DbSet<Core.Entities.Sections.ToursSection> ToursSections { get; set; }
        public DbSet<Core.Entities.Sections.ServicesSection> ServicesSections { get; set; }
        public DbSet<Core.Entities.Sections.ContactSection> ContactSections { get; set; }
        public DbSet<Core.Entities.Sections.GallerySection> GallerySections { get; set; }
        public DbSet<Core.Entities.Sections.FavoritesSection> FavoritesSections { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BaseEntity &&
                            (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                var entity = (BaseEntity)entry.Entity;
                var now = DateTime.UtcNow; 

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedAt = now;
                }
                else
                {
                    Entry(entity).Property(x => x.CreatedAt).IsModified = false;
                    entity.UpdatedAt = now;
                }
            }
        }
    }
}
