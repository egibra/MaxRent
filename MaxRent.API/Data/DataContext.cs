using MaxRent.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MaxRent.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products {get;set;}
        public DbSet<ProductPhoto> Photos {get;set;}
         protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>().HasMany(i => i.Photos);
        }
    }
}