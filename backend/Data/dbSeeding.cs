using Backend.Entities;
using Backend.Data;

namespace Backend.Data;
public static class DBSeeding
{
    public static void Seed()
    {
        Department dep1 = new() { Name = "Department1" };
        Department dep2 = new() { Name = "Department2" };
        Department dep3 = new() { Name = "Department3" };

        MachineModel MachineModel1 = new() { Name = "Machine1", Description = "This is machine 1", Department = dep1 };
        MachineModel MachineModel2 = new() { Name = "Machine2", Description = "This is machine 2", Department = dep2 };
        MachineModel MachineModel3 = new() { Name = "Machine3", Description = "This is machine 3", Department = dep3 };
        MachineModel MachineModel4 = new() { Name = "Machine4", Description = "This is machine 4", Department = dep1 };
        MachineModel MachineModel5 = new() { Name = "Machine5", Description = "This is machine 5", Department = dep2 };
        MachineModel MachineModel6 = new() { Name = "Machine6", Description = "This is machine 6", Department = dep3 };
        MachineModel MachineModel7 = new() { Name = "Machine7", Description = "This is machine 7", Department = dep1 };
        MachineModel MachineModel8 = new() { Name = "Machine8", Description = "This is machine 8", Department = dep2 };
        MachineModel MachineModel9 = new() { Name = "Machine9", Description = "This is machine 9", Department = dep3 };
        MachineModel MachineModel10 = new() { Name = "Machine10", Description = "This is machine 10", Department = dep1 };
        MachineModel MachineModel11 = new() { Name = "Machine11", Description = "This is machine 11", Department = dep2 };
        MachineModel MachineModel12 = new() { Name = "Machine12", Description = "This is machine 12", Department = dep3 };
        MachineModel MachineModel13 = new() { Name = "Machine13", Description = "This is machine 13", Department = dep1 };
        MachineModel MachineModel14 = new() { Name = "Machine14", Description = "This is machine 14", Department = dep2 };
        MachineModel MachineModel15 = new() { Name = "Machine15", Description = "This is machine 15", Department = dep3 };
        Machine Machine1 = new() { Model = MachineModel1 };
        Machine Machine2 = new() { Model = MachineModel2 };
        Machine Machine3 = new() { Model = MachineModel3 };
        Machine Machine4 = new() { Model = MachineModel4 };
        Machine Machine5 = new() { Model = MachineModel5 };
        Machine Machine6 = new() { Model = MachineModel6 };
        Machine Machine7 = new() { Model = MachineModel7 };
        Machine Machine8 = new() { Model = MachineModel8 };
        Machine Machine9 = new() { Model = MachineModel9 };
        Machine Machine10 = new() { Model = MachineModel10 };
        Machine Machine11 = new() { Model = MachineModel11 };
        Machine Machine12 = new() { Model = MachineModel12 };
        Machine Machine13 = new() { Model = MachineModel13 };
        Machine Machine14 = new() { Model = MachineModel14 };
        Machine Machine15 = new() { Model = MachineModel15 };
        List<MachineModel> machines = new() { MachineModel1, MachineModel2, MachineModel3, MachineModel4, MachineModel5, MachineModel6, MachineModel7, MachineModel8, MachineModel9, MachineModel10, MachineModel11, MachineModel12, MachineModel13, MachineModel14, MachineModel15 };

        Account Client = new() { Name = "clientname", Password = "clientpw", Class = AccountType.Client };
        Account Client1 = new() { Name = "clientname1", Password = "clientpw1", Class = AccountType.Client };
        Account Client2 = new() { Name = "clientname2", Password = "clientpw2", Class = AccountType.Client };
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

        Customer customer = new() { Account = Client };
        Customer customer1 = new() { Account = Client1 };
        Customer customer2 = new() { Account = Client2 };

        customer.Machines.Add(Machine1);
        customer.Machines.Add(Machine1);
        customer.Machines.Add(Machine2);
        customer.Machines.Add(Machine3);
        customer.Machines.Add(Machine4);
        customer.Machines.Add(Machine15);

        customer1.Machines.Add(Machine5);
        customer1.Machines.Add(Machine6);
        customer1.Machines.Add(Machine7);
        customer1.Machines.Add(Machine8);
        customer1.Machines.Add(Machine9);

        customer2.Machines.Add(Machine10);
        customer2.Machines.Add(Machine11);
        customer2.Machines.Add(Machine12);
        customer2.Machines.Add(Machine13);
        customer2.Machines.Add(Machine14);

        dep1.Employees.Add(emp1);
        dep1.Employees.Add(emp2);
        dep2.Employees.Add(emp3);
        dep2.Employees.Add(emp4);
        dep3.Employees.Add(emp5);
        dep3.Employees.Add(emp6);
        dep3.Employees.Add(admin);

        List<Employee> employees = new() { emp1, emp2, emp3, emp4, emp5, emp6, admin };
        List<Account> accounts = new() { Client, employee1, employee2, employee3, employee4, employee5, employee6, Admin };
        List<Department> deps = new() { dep1, dep2, dep3 };
        List<Customer> customers = new() { customer, customer1, customer2 };

        Ticket ticket1 = new() { Model = MachineModel1, Machine = Machine1, Customer = customer, Title = "test", Priority = "Critical", Status = "In Process", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket2 = new() { Model = MachineModel2, Machine = Machine2, Customer = customer1, Title = "test", Priority = "Non critical", Status = "In Process", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket3 = new() { Model = MachineModel3, Machine = Machine3, Customer = customer2, Title = "test", Priority = "Critical", Status = "Closed", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket4 = new() { Model = MachineModel4, Machine = Machine4, Customer = customer, Title = "test", Priority = "Critical", Status = "In Process", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket5 = new() { Model = MachineModel5, Machine = Machine5, Customer = customer1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket6 = new() { Model = MachineModel6, Machine = Machine6, Customer = customer2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket7 = new() { Model = MachineModel7, Machine = Machine7, Customer = customer, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket8 = new() { Model = MachineModel8, Machine = Machine8, Customer = customer1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket9 = new() { Model = MachineModel9, Machine = Machine9, Customer = customer2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket10 = new() { Model = MachineModel10, Machine = Machine10, Customer = customer, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket11 = new() { Model = MachineModel11, Machine = Machine11, Customer = customer1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket12 = new() { Model = MachineModel12, Machine = Machine12, Customer = customer2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket13 = new() { Model = MachineModel13, Machine = Machine13, Customer = customer, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket14 = new() { Model = MachineModel14, Machine = Machine14, Customer = customer1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket15 = new() { Model = MachineModel15, Machine = Machine15, Customer = customer2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket16 = new() { Model = MachineModel1, Machine = Machine1, Customer = customer, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket17 = new() { Model = MachineModel2, Machine = Machine2, Customer = customer1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket18 = new() { Model = MachineModel3, Machine = Machine3, Customer = customer2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket19 = new() { Model = MachineModel4, Machine = Machine4, Customer = customer, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket20 = new() { Model = MachineModel5, Machine = Machine5, Customer = customer1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket21 = new() { Model = MachineModel6, Machine = Machine6, Customer = customer2, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket22 = new() { Model = MachineModel7, Machine = Machine7, Customer = customer, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket23 = new() { Model = MachineModel8, Machine = Machine8, Customer = customer1, Title = "test", Priority = "Non critical", Status = "Open", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket24 = new() { Model = MachineModel9, Machine = Machine9, Customer = customer2, Title = "test", Priority = "Critical", Status = "Closed", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
        Ticket ticket25 = new() { Model = MachineModel10, Machine = Machine10, Customer = customer, Title = "test", Priority = "Critical", Status = "Closed", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };

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
        admin.Tickets.Add(ticket9);
        admin.Tickets.Add(ticket10);

        Solution solution1 = new() { ProblemDescription = "Device stopped working", SolutionDescription = "Press the green button", Ticket = ticket1, Model = MachineModel10, Machine = Machine10 };
        Solution solution2 = new() { ProblemDescription = "Machine is stuck", SolutionDescription = "Remove the sticks stuck inbetween", Ticket = ticket2, Model = MachineModel12, Machine = Machine12 };
        Solution solution3 = new() { ProblemDescription = "Machine is frozen", SolutionDescription = "Warm up the machine", Ticket = ticket3, Model = MachineModel13, Machine = Machine13 };
        Solution solution4 = new() { ProblemDescription = "Everything is upside-down", SolutionDescription = "down-upside it", Ticket = ticket4, Model = MachineModel14, Machine = Machine14 };
        Solution solution5 = new() { ProblemDescription = "It's broken", SolutionDescription = "We fixed it", Ticket = ticket15, Model = MachineModel15, Machine = Machine15 };
        Solution solution6 = new() { ProblemDescription = "It is in a strange language", SolutionDescription = "Change the language", Ticket = ticket16, Model = MachineModel1, Machine = Machine1 };
        Solution solution7 = new() { ProblemDescription = "The button is stuck", SolutionDescription = "Put oil in it", Ticket = ticket1, Model = MachineModel1, Machine = Machine1 };
        Solution solution8 = new() { ProblemDescription = "I dont know the problem", SolutionDescription = "Somehow fixed", Ticket = ticket2, Model = MachineModel2, Machine = Machine2 };
        Solution solution9 = new() { ProblemDescription = "It's ugly", SolutionDescription = "make it beautiful", Ticket = ticket3, Model = MachineModel3, Machine = Machine3 };
        Solution solution10 = new() { ProblemDescription = "Wrong machine", SolutionDescription = "Retour the machine", Ticket = ticket4, Model = MachineModel4, Machine = Machine4 };
        Solution solution11 = new() { ProblemDescription = "The machine is alive", SolutionDescription = "Kill it", Ticket = ticket5, Model = MachineModel5, Machine = Machine5 };
        Solution solution12 = new() { ProblemDescription = "It doesn't turn on", SolutionDescription = "Change the batteries", Ticket = ticket6, Model = MachineModel6, Machine = Machine6 };

        List<Solution> solutions = new() { solution1, solution2, solution3, solution4, solution5, solution6, solution7, solution8, solution9, solution10, solution11, solution12 };

        var db = new DataContext();
        foreach (MachineModel machine in machines)
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
        foreach (Customer cust in customers)
        {
            db.Add(cust);
        }
        foreach (Solution solution in solutions)
        {
            db.Add(solution);
        }
        db.SaveChanges();
    }
}