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
    }
}