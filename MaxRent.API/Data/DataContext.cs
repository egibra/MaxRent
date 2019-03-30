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
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
         protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>().HasMany(i => i.Photos);
            builder.Entity<Product>().HasMany(i => i.Assets);
            builder.Entity<Order>().HasMany(i => i.OrderItems);

            builder.Entity<OrderItemAsset>()
                .HasKey(ois => new { ois.AssetId, ois.OrderItemId });
            builder.Entity<OrderItemAsset>()
                .HasOne(ois => ois.Asset)
                .WithMany(asset => asset.OrderItemAssets);
            builder.Entity<OrderItemAsset>()
                .HasOne(ois => ois.OrderItem)
                .WithMany(orderItem => orderItem.OrderItemAssets);
        }
    }
}