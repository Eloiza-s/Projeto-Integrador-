using Microsoft.EntityFrameworkCore;
using backend.Model;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Estado> Estados { get; set; }
        public DbSet<EstruturaEtaria> EstruturasEtarias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Estado>()
                .HasIndex(e => e.Uf)
                .IsUnique();

            modelBuilder.Entity<Estado>()
                .HasIndex(e => e.CodigoIbge)
                .IsUnique();
        }
    }
}