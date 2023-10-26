using Microsoft.EntityFrameworkCore;
using backend.Entities;

namespace backend.Data;
public class DataContext :  DbContext
{
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
        public DataContext()
        {
            
        }
        public DbSet<Account> Accounts {get; set; } = null!;
        public DbSet<Machine> Machines {get; set; } = null!; 
        public DbSet<Ticket> Tickets {get; set;} = null!;
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
        builder.UseNpgsql(@"Host=localhost:5432;Username=postgres;Password=1234;Database=ProjectC_Database;Maximum Pool Size=200");
        builder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug);
        }  
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasKey(x => x.AccountId);
            modelBuilder.Entity<Machine>().HasKey(x => x.MachineId);
            modelBuilder.Entity<Ticket>().HasKey(x => x.TicketId);
        }
}