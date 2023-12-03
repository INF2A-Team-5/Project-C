using Microsoft.EntityFrameworkCore;
using Backend.Entities;
using Microsoft.EntityFrameworkCore.Internal;

namespace Backend.Data;
public class DataContext : DbContext
{

      public DataContext(DbContextOptions<DataContext> options) : base(options){}
      public DataContext(){}
      public DbSet<Account> Accounts {get; set; } = null!;
      public DbSet<Machine> Machines {get; set; } = null!;
      public DbSet<Ticket> Tickets { get; set; } = null!;
      public DbSet<Department> Departments {get; set; } = null!;
      public DbSet<Solution> Solutions {get; set; } = null!;
      public DbSet<TicketFile> Files {get; set; } = null!;
      protected override void OnConfiguring(DbContextOptionsBuilder builder)
      {
      builder.UseNpgsql(@"Host=localhost:5432;Username=postgres;Password=123;Database=ProjectC_Database;Maximum Pool Size=200");
      builder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug);
      }
      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
          modelBuilder.Entity<Account>().HasKey(x => x.AccountId);
          modelBuilder.Entity<Machine>().HasKey(x => x.MachineId);
          modelBuilder.Entity<Ticket>().HasKey(x => x.TicketId);
          modelBuilder.Entity<Department>().HasKey(x => x.DepartmentId);
          modelBuilder.Entity<Solution>().HasKey(x => x.SolutionId);
          modelBuilder.Entity<TicketFile>().HasKey(x => x.FileId);
      }
}
