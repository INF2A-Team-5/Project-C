using Microsoft.EntityFrameworkCore;

namespace backend.Models;
public class DataContext :  DbContext
{
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
        public DataContext()
        {
            
        }
        // //public DbSet<Machine> Machine {get; set; } = null!; 
        public DbSet<Account> Accounts {get; set; } = null !;
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
        builder.UseNpgsql(@"Host=localhost:5432;Username=postgres;Password=1234;Database=ProjectC_Database;Maximum Pool Size=200");
        builder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug);
        }  
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<Account>().HasKey(x => x.AccountId);
        // }
}