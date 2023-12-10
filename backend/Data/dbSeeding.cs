using Backend.Entities;
using Backend.Data;

namespace Backend.Data;
public static class DBSeeding
{
    public static void Seed()
    {
        Department dep1 = new() { DepartmentId = 1, Name = "Department1" };
        Department dep2 = new() { DepartmentId = 2, Name = "Department2" };
        Department dep3 = new() { DepartmentId = 3, Name = "Department3" };

        Machine Machine1 = new() { Name = "Machine1", Description = "This is machine 1", AccountId = 1, DepartmentId = 1 };
        Machine Machine2 = new() { Name = "Machine2", Description = "This is machine 2", AccountId = 2, DepartmentId = 2 };
        Machine Machine3 = new() { Name = "Machine3", Description = "This is machine 3", AccountId = 2, DepartmentId = 3 };
        Machine Machine4 = new() { Name = "Machine4", Description = "This is machine 4", AccountId = 3, DepartmentId = 1 };
        Machine Machine5 = new() { Name = "Machine5", Description = "This is machine 5", AccountId = 3, DepartmentId = 2 };
        Machine Machine6 = new() { Name = "Machine6", Description = "This is machine 6", AccountId = 3, DepartmentId = 3 };
        Machine Machine7 = new() { Name = "Machine7", Description = "This is machine 7", AccountId = 1, DepartmentId = 3 };
        Machine Machine8 = new() { Name = "Machine8", Description = "This is machine 8", AccountId = 2, DepartmentId = 2 };
        Machine Machine9 = new() { Name = "Machine9", Description = "This is machine 9", AccountId = 2, DepartmentId = 1 };
        Machine Machine10 = new() { Name = "Machine10", Description = "This is machine 10", AccountId = 2, DepartmentId = 2 };
        Machine Machine11 = new() { Name = "Machine11", Description = "This is machine 11", AccountId = 3, DepartmentId = 3 };
        Machine Machine12 = new() { Name = "Machine12", Description = "This is machine 12", AccountId = 2, DepartmentId = 1 };
        Machine Machine13 = new() { Name = "Machine13", Description = "This is machine 13", AccountId = 2, DepartmentId = 2 };
        Machine Machine14 = new() { Name = "Machine14", Description = "This is machine 14", AccountId = 1, DepartmentId = 3 };
        Machine Machine15 = new() { Name = "Machine15", Description = "This is machine 15", AccountId = 3, DepartmentId = 1 };
        Machine Machine16 = new() { Name = "Machine16", Description = "This is machine 16", AccountId = 2, DepartmentId = 2 };
        Machine Machine17 = new() { Name = "Machine17", Description = "This is machine 17", AccountId = 3, DepartmentId = 3 };
        Machine Machine18 = new() { Name = "Machine18", Description = "This is machine 18", AccountId = 3, DepartmentId = 1 };
        Machine Machine19 = new() { Name = "Machine19", Description = "This is machine 19", AccountId = 1, DepartmentId = 2 };
        Machine Machine20 = new() { Name = "Machine20", Description = "This is machine 20", AccountId = 1, DepartmentId = 3 };
        Machine Machine21 = new() { Name = "Machine21", Description = "This is machine 21", AccountId = 3, DepartmentId = 1 };
        Machine Machine22 = new() { Name = "Machine22", Description = "This is machine 22", AccountId = 3, DepartmentId = 2 };
        Machine Machine23 = new() { Name = "Machine23", Description = "This is machine 23", AccountId = 2, DepartmentId = 3 };
        Machine Machine24 = new() { Name = "Machine24", Description = "This is machine 24", AccountId = 1, DepartmentId = 2 };
        Machine Machine25 = new() { Name = "Machine25", Description = "This is machine 25", AccountId = 2, DepartmentId = 1 };
        
        List<Machine> machines = new() { Machine1, Machine2, Machine3, Machine4, Machine5, Machine6, Machine7, Machine8, Machine9, Machine10, Machine11, Machine12, Machine13, Machine14, Machine15, Machine16, Machine17, Machine18, Machine19, Machine20, Machine21, Machine22, Machine23, Machine24, Machine25 };

        Customer Client = new() { Name = "clientname", Password = "clientpw", Class = AccountType.Client };
        Account employee1 = new() { Name = "empname", Password = "emppw", Class = AccountType.ServiceEmployee };
        Account employee2 = new() { Name = "empname2", Password = "emppw2", Class = AccountType.ServiceEmployee };
        Account employee3 = new() { Name = "empname3", Password = "emppw3", Class = AccountType.ServiceEmployee };
        Account employee4 = new() { Name = "empname4", Password = "emppw4", Class = AccountType.ServiceEmployee };
        Account employee5 = new() { Name = "empname5", Password = "emppw5", Class = AccountType.ServiceEmployee };
        Account employee6 = new() { Name = "empname6", Password = "emppw6", Class = AccountType.ServiceEmployee };
        Account Admin = new() { Name = "adminname", Password = "adminpw", Class = AccountType.Admin };

        Employee emp1 = new() { Account = employee1 };
        Employee emp2 = new() { Account = employee2 };
        Employee emp3 = new() { Account = employee3 };
        Employee emp4 = new() { Account = employee4 };
        Employee emp5 = new() { Account = employee5 };
        Employee emp6 = new() { Account = employee6 };
        Employee admin = new() { Account = Admin };

        dep1.Employees.Add(emp1);
        dep1.Employees.Add(emp2);
        dep2.Employees.Add(emp3);
        dep2.Employees.Add(emp4);
        dep3.Employees.Add(emp5);
        dep3.Employees.Add(emp6);
        dep3.Employees.Add(admin);

        List<Employee> employees = new() {emp1, emp2, emp3, emp4, emp5, emp6, admin};
        List<Account> accounts = new() { Client, employee1, employee2, employee3, employee4, employee5, employee6, Admin };
        List<Department> deps = new() { dep1, dep2, dep3 };

        Ticket ticket1 = new() { Machine_Id = 1, Customer_Id = 1, Title = "test", Priority = "Critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket2 = new() { Machine_Id = 2, Customer_Id = 1, Title = "test", Priority = "Non critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket3 = new() { Machine_Id = 3, Customer_Id = 1, Title = "test", Priority = "Critical", Status = "Closed", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket4 = new() { Machine_Id = 4, Customer_Id = 1, Title = "test", Priority = "Critical", Status = "In Process", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket5 = new() { Machine_Id = 5, Customer_Id = 1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket6 = new() { Machine_Id = 6, Customer_Id = 1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket7 = new() { Machine_Id = 7, Customer_Id = 1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket8 = new() { Machine_Id = 8, Customer_Id = 1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket9 = new() { Machine_Id = 9, Customer_Id = 1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket10 = new() { Machine_Id = 10, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket11 = new() { Machine_Id = 11, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket12 = new() { Machine_Id = 12, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket13 = new() { Machine_Id = 13, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket14 = new() { Machine_Id = 14, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket15 = new() { Machine_Id = 15, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket16 = new() { Machine_Id = 16, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket17 = new() { Machine_Id = 17, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket18 = new() { Machine_Id = 18, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket19 = new() { Machine_Id = 19, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket20 = new() { Machine_Id = 20, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket21 = new() { Machine_Id = 21, Customer_Id = 2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket22 = new() { Machine_Id = 22, Customer_Id = 3, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket23 = new() { Machine_Id = 23, Customer_Id = 3, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678", Notes = "Test" };
        Ticket ticket24 = new() { Machine_Id = 24, Customer_Id = 2, Title = "test", Priority = "Critical", Status = "Closed", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket25 = new() { Machine_Id = 25, Customer_Id = 2, Title = "test", Priority = "Critical", Status = "Closed", Date_Created = DateTime.UtcNow, Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };

        List<Ticket> tickets = new() { ticket1, ticket2, ticket3, ticket4, ticket5, ticket6, ticket7, ticket8, ticket9, ticket10, ticket11, ticket12, ticket13, ticket14, ticket15, ticket16, ticket17, ticket18, ticket19, ticket20, ticket21, ticket22, ticket23, ticket24, ticket25 };

        emp1.Tickets.Add(ticket1); //ticket 16
        emp1.Tickets.Add(ticket2); //ticket 17
        emp1.Tickets.Add(ticket4); //ticket 19
        emp1.Tickets.Add(ticket25); //ticket 25
        emp1.Tickets.Add(ticket23); //ticket 24
        
        emp2.Tickets.Add(ticket5); //ticket 20
        emp2.Tickets.Add(ticket3); //ticket 18
        emp2.Tickets.Add(ticket6); //ticket 21
        emp2.Tickets.Add(ticket7); //ticket 22
        emp2.Tickets.Add(ticket8); //ticket 23

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
        foreach (Department dep in deps)
        {
            db.Add(dep);
        }
        foreach (Employee employee in employees)
        {
            db.Add(employee);
        }
        db.SaveChanges();
    }
}