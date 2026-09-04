using Microsoft.EntityFrameworkCore;
using MovieLibraryApp.Models;

namespace MovieLibraryApp.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<WatchListItem> WatchListItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .Property(m => m.Genres)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v == "" ? new List<string>() : v.Split(',', StringSplitOptions.None).ToList()
                );
        }
    }
}