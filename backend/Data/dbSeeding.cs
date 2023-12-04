using Backend.Entities;
using Backend.Data;

namespace Backend.Data;
public static class DBSeeding
{
    public static void Seed()
    {
        Machine Machine1 = new() { Name = "Machine1", Description = "This is machine 1", AccountId = 1 };
        Machine Machine2 = new() { Name = "Machine2", Description = "This is machine 2", AccountId = 1 };
        Machine Machine3 = new() { Name = "Machine3", Description = "This is machine 3", AccountId = 1 };
        Machine Machine4 = new() { Name = "Machine4", Description = "This is machine 4", AccountId = 1 };
        Machine Machine5 = new() { Name = "Machine5", Description = "This is machine 5", AccountId = 1 };
        Machine Machine6 = new() { Name = "Machine6", Description = "This is machine 6", AccountId = 1 };
        Machine Machine7 = new() { Name = "Machine7", Description = "This is machine 7", AccountId = 1 };
        Machine Machine8 = new() { Name = "Machine8", Description = "This is machine 8", AccountId = 2 };
        Machine Machine9 = new() { Name = "Machine9", Description = "This is machine 9", AccountId = 2 };
        Machine Machine10 = new() { Name = "Machine10", Description = "This is machine 10", AccountId = 2 };
        Machine Machine11 = new() { Name = "Machine11", Description = "This is machine 11", AccountId = 2 };
        Machine Machine12 = new() { Name = "Machine12", Description = "This is machine 12", AccountId = 2 };
        Machine Machine13 = new() { Name = "Machine13", Description = "This is machine 13", AccountId = 2 };
        Machine Machine14 = new() { Name = "Machine14", Description = "This is machine 14", AccountId = 3 };
        Machine Machine15 = new() { Name = "Machine15", Description = "This is machine 15", AccountId = 3 };
        Machine Machine16 = new() { Name = "Machine16", Description = "This is machine 16", AccountId = 3 };
        Machine Machine17 = new() { Name = "Machine17", Description = "This is machine 17", AccountId = 3 };
        Machine Machine18 = new() { Name = "Machine18", Description = "This is machine 18", AccountId = 3 };
        Machine Machine19 = new() { Name = "Machine19", Description = "This is machine 19", AccountId = 3 };
        Machine Machine20 = new() { Name = "Machine20", Description = "This is machine 20", AccountId = 3 };
        Machine Machine21 = new() { Name = "Machine21", Description = "This is machine 21", AccountId = 3 };
        Machine Machine22 = new() { Name = "Machine22", Description = "This is machine 22", AccountId = 3 };
        Machine Machine23 = new() { Name = "Machine23", Description = "This is machine 23", AccountId = 3 };
        Machine Machine24 = new() { Name = "Machine24", Description = "This is machine 24", AccountId = 3 };
        Machine Machine25 = new() { Name = "Machine25", Description = "This is machine 25", AccountId = 3 };
        List<Machine> machines = new() { Machine1, Machine2, Machine3, Machine4, Machine5, Machine6, Machine7, Machine8, Machine9, Machine10, Machine11, Machine12, Machine13, Machine14, Machine15, Machine16, Machine17, Machine18, Machine19, Machine20, Machine21, Machine22, Machine23, Machine24, Machine25 };

        Account Client = new() { Name = "clientname", Password = "clientpw", Class = AccountType.Client };
        Account Employee = new() { Name = "empname", Password = "emppw", Class = AccountType.ServiceEmployee };
        Account Admin = new() { Name = "adminname", Password = "adminpw", Class = AccountType.Admin };
        List<Account> accounts = new() { Client, Employee, Admin };

        Ticket ticket1 = new() { Machine_Id = 3, Customer_Id = 1, Priority = "Critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket2 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 1, Priority = "Non critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket3 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 1, Priority = "Critical", Status = "Closed", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket4 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 1, Priority = "Critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket5 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 1, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket6 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 1, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket7 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 1, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket8 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket9 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket10 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket11 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket12 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket13 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket14 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket15 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket16 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket17 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket18 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket19 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket20 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 2, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket21 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 3, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket22 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 3, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket23 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 3, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket24 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 3, Priority = "Critical", Status = "Closed", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket25 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 3, Priority = "Critical", Status = "Closed", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };

        List<Ticket> tickets = new() { ticket1, ticket2, ticket3, ticket4, ticket5, ticket6, ticket7, ticket8, ticket9, ticket10, ticket11, ticket12, ticket13, ticket14, ticket15, ticket16, ticket17, ticket18, ticket19, ticket20, ticket21, ticket22, ticket23, ticket24, ticket25 };

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