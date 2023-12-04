using Backend.Entities;
using Backend.Data;

namespace Backend.Data;
public static class DBSeeding
{
    public static void Seed()
    {
        Machine Machine1 = new() { Name = "Machine1", Description = "This is machine 1", AccountId = 1 };
        Machine Machine2 = new() { Name = "Machine2", Description = "This is machine 2", AccountId = 2 };
        Machine Machine3 = new() { Name = "Machine3", Description = "This is machine 3", AccountId = 2 };
        Machine Machine4 = new() { Name = "Machine4", Description = "This is machine 4", AccountId = 3 };
        Machine Machine5 = new() { Name = "Machine5", Description = "This is machine 5", AccountId = 3 };
        Machine Machine6 = new() { Name = "Machine6", Description = "This is machine 6", AccountId = 3 };
        List<Machine> machines = new() { Machine1, Machine2, Machine3, Machine4, Machine5, Machine6 };

        Account Client = new() { Name = "clientname", Password = "clientpw", Class = AccountType.Client };
        Account Employee = new() { Name = "empname", Password = "emppw", Class = AccountType.ServiceEmployee };
        Account Admin = new() { Name = "adminname", Password = "adminpw", Class = AccountType.Admin };
        List<Account> accounts = new() { Client, Employee, Admin };

        Ticket ticket1 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket2 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 3, Priority = "Non critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test",Solution = "Test",  PhoneNumber = "0612345678" };
        Ticket ticket3 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Critical", Status = "Closed", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test",  PhoneNumber = "0612345678" };
        Ticket ticket4 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test",Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket5 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 3, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        List<Ticket> tickets = new() { ticket1, ticket2, ticket3, ticket4, ticket5 };

        var db = new DataContext();
        foreach (Machine machine in machines)
        {
            db.Add(machine);
        }
        foreach (Account account in accounts)
        {
            db.Add(account);
        }
        foreach (Ticket ticket in tickets)
        {
            db.Add(ticket);
        }

        db.SaveChanges();
    }
}