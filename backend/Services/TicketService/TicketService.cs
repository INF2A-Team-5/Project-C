using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;
using Backend.Dto;

namespace Backend.TicketService
{
    public class TicketService : ControllerBase, ITicketService
    {
        private readonly DataContext _context;

        public TicketService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets(int AccountId, bool archived)
        {
            if (_context.Accounts == null || _context.Tickets == null || _context.Customers == null | _context.Employees == null || _context.Departments == null)
            {
                return NotFound();
            }
            var account = await (from accs in _context.Accounts where accs.AccountId == AccountId select accs).FirstOrDefaultAsync();
            if (account == null)
            {
                return NotFound();
            }
            switch (account.Class)
            {
                case AccountType.ServiceEmployee:
                    var employee = await (from accs in _context.Employees where accs.AccountId == account.AccountId select accs).FirstOrDefaultAsync();
                    int departmentId = await (from employees in _context.Employees where employees.AccountId == AccountId select employees.DepartmentId).FirstOrDefaultAsync();
                    if (employee == null)
                    {
                        return NotFound();
                    }
                    var empTickets = await (from ticket in _context.Tickets from machinemodel in _context.Models where ticket.ModelId == machinemodel.ModelId && machinemodel.DepartmentId == departmentId && ticket.Archived == archived select ticket).ToListAsync();
                    if (empTickets == null || empTickets.Count == 0)
                    {
                        return NotFound("No tickets under this department");
                    }
                    return empTickets;
                case AccountType.Client:
                    var customer = await (from customers in _context.Customers where customers.AccountId == AccountId select customers).FirstOrDefaultAsync();
                    if (customer == null)
                    {
                        return NotFound("Customer does not exist");
                    }
                    var cusTickets = await (from ticket in _context.Tickets where ticket.Customer_Id == customer.CustomerId && ticket.Archived == archived select ticket).ToListAsync();
                    if (cusTickets == null || cusTickets.Count == 0)
                    {
                        return NotFound("No tickets found");
                    }
                    return cusTickets;
                case AccountType.Admin:
                    var adminTickets = await (from ticket in _context.Tickets where ticket.Archived == archived select ticket).ToListAsync();
                    if (adminTickets == null || adminTickets.Count == 0)
                    {
                        return NotFound("No tickets found");
                    }
                    return adminTickets;
            }
            return NotFound();
        }

        public async Task<ActionResult<Ticket>> GetTicketById(int id)
        {
            if (_context.Tickets == null)
            {
                return NotFound();
            }
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return ticket;
        }

        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketsByArchived(bool archived)
        {
            if (_context.Tickets == null)
            {
                return NotFound();
            }
            var tickets = await _context.Tickets.Where(t => t.Archived == archived).ToListAsync();
            if (tickets == null)
            {
                return NotFound();
            }
            return tickets;
        }

        public async Task<IActionResult> UpdateTicket(int id, TicketDto ticket)
        {
            var correct_ticket = await _context.Tickets.Where(tickets => tickets.TicketId == id).FirstOrDefaultAsync();
            if (id != correct_ticket.TicketId || correct_ticket == null)
            {
                return BadRequest();
            }
            correct_ticket.Employee_Id = ticket.Employee_Id;
            correct_ticket.Title = ticket.Title;
            correct_ticket.Priority = ticket.Priority;
            correct_ticket.Status = ticket.Status;
            correct_ticket.Problem = ticket.Problem;
            correct_ticket.HaveTried = ticket.HaveTried;
            correct_ticket.MustBeDoing = ticket.MustBeDoing;
            correct_ticket.Solution = ticket.Solution;
            correct_ticket.Notes = ticket.Notes;
            correct_ticket.Files = ticket.Files;
            correct_ticket.PhoneNumber = ticket.PhoneNumber;
            correct_ticket.Archived = ticket.Archived;

            _context.Entry(correct_ticket).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        public async Task<ActionResult<Ticket>> AddTicket(TicketDto ticket)
        {
            if (_context.Tickets == null)
            {
                return Problem("Entity set 'DataContext.Tickets'  is null.");
            }
            var machine = await _context.Machines.Where(mach => mach.MachineId == ticket.Machine_Id).FirstOrDefaultAsync();
            var model = await _context.Models.Where(model => model.ModelId == ticket.ModelId).FirstOrDefaultAsync();
            var customer = await _context.Customers.Where(cust => cust.CustomerId == ticket.Customer_Id).FirstOrDefaultAsync();
            if (machine == null || model == null || customer == null)
            {
                return NotFound();
            }
            Ticket new_ticket = new()
            {
                Machine = machine,
                Model = model,
                Customer = customer,
                Title = ticket.Title,
                Priority = ticket.Priority,
                Status = ticket.Status,
                Date_Created = ticket.Date_Created,
                Problem = ticket.Problem,
                HaveTried = ticket.HaveTried,
                MustBeDoing = ticket.MustBeDoing,
                Solution = ticket.Solution,
                PhoneNumber = ticket.PhoneNumber,
                Files = ticket.Files
            };

            _context.Tickets.Add(new_ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicketById), new { id = new_ticket.TicketId }, new_ticket);
        }

        public async Task<IActionResult> DeleteTicket(int id)
        {
            if (_context.Tickets == null)
            {
                return NotFound();
            }
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetAssignedTickets(int AccountId)
        {
            if (_context.Tickets == null || _context.Departments == null || _context.Machines == null || _context.Employees == null)
            {
                return NotFound("No data found in db");
            }
            var account = await (from accs in _context.Accounts where accs.AccountId == AccountId select accs).FirstOrDefaultAsync();
            if (account == null)
            {
                return NotFound();
            }
            var employee = await (from accs in _context.Employees where accs.AccountId == account.AccountId select accs).FirstOrDefaultAsync();
            int departmentId = await (from employees in _context.Employees where employees.AccountId == AccountId select employees.DepartmentId).FirstOrDefaultAsync();
            if (employee == null)
            {
                return NotFound("No tickets found");
            }
            var empTickets = await (from ticket in _context.Tickets from machinemodel in _context.Models where ticket.ModelId == machinemodel.ModelId && machinemodel.DepartmentId == departmentId && ticket.Employee_Id == employee.EmployeeId select ticket).ToListAsync();
            if (empTickets == null || empTickets.Count == 0)
            {
                return NotFound("No tickets found");
            }
            return empTickets;
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetUnasignedTickets(int AccountId)
        {
            if (_context.Tickets == null || _context.Departments == null || _context.Machines == null || _context.Employees == null)
            {
                return NotFound("No data found in db");
            }
            var account = await (from accs in _context.Accounts where accs.AccountId == AccountId select accs).FirstOrDefaultAsync();
            if (account == null)
            {
                return NotFound();
            }
            if (account.Class == AccountType.ServiceEmployee)
            {
                var employee = await (from accs in _context.Employees where accs.AccountId == account.AccountId select accs).FirstOrDefaultAsync();
                int departmentId = await (from employees in _context.Employees where employees.AccountId == AccountId select employees.DepartmentId).FirstOrDefaultAsync();
                if (employee == null)
                {
                    return NotFound();
                }
                var empTickets = await (from ticket in _context.Tickets from machinemodel in _context.Models where ticket.ModelId == machinemodel.ModelId && machinemodel.DepartmentId == departmentId && ticket.Employee_Id == null select ticket).ToListAsync();
                return empTickets;
            }
            if (account.Class == AccountType.Admin)
            {
                var tickets = await (from ticket in _context.Tickets where ticket.Employee_Id == null select ticket).ToListAsync();
                return tickets;
            }
            return NotFound();

        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetClosedTickets(int AccountId)
        {
            if (_context.Tickets == null || _context.Departments == null || _context.Machines == null || _context.Employees == null)
            {
                return NotFound("No data found in db");
            }
            var account = await (from accs in _context.Accounts where accs.AccountId == AccountId select accs).FirstOrDefaultAsync();
            if (account == null)
            {
                return NotFound();
            }
            switch (account.Class)
            {
                case AccountType.ServiceEmployee:
                    var employee = await (from accs in _context.Employees where accs.AccountId == account.AccountId select accs).FirstOrDefaultAsync();
                    int departmentId = await (from employees in _context.Employees where employees.AccountId == AccountId select employees.DepartmentId).FirstOrDefaultAsync();
                    if (employee == null)
                    {
                        return NotFound();
                    }
                    var empTickets = await (from ticket in _context.Tickets from machinemodel in _context.Models where ticket.ModelId == machinemodel.ModelId && machinemodel.DepartmentId == departmentId && ticket.Status == "Closed" select ticket).ToListAsync();
                    if (empTickets == null || empTickets.Count == 0)
                    {
                        return NotFound("No tickets under this department");
                    }
                    return empTickets;
                case AccountType.Client:
                    var customer = await (from customers in _context.Customers where customers.AccountId == AccountId select customers).FirstOrDefaultAsync();
                    if (customer == null)
                    {
                        return NotFound("Customer does not exist");
                    }
                    var cusTickets = await (from ticket in _context.Tickets where ticket.Customer_Id == customer.AccountId && ticket.Status == "Closed" select ticket).ToListAsync();
                    if (cusTickets == null || cusTickets.Count == 0)
                    {
                        return NotFound("No tickets found");
                    }
                    return cusTickets;
                case AccountType.Admin:
                    var adminTickets = await (from ticket in _context.Tickets where ticket.Status == "Closed" select ticket).ToListAsync();
                    if (adminTickets == null || adminTickets.Count == 0)
                    {
                        return NotFound("No tickets found");
                    }
                    return adminTickets;
            }
            return NotFound();
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetClosedTicketsPerCustomer(int AccountId)
        {
            if (_context.Tickets == null || _context.Accounts == null)
            {
                return NotFound("No data found in db");
            }
            var tickets = await (from ticket in _context.Tickets where ticket.Status == "Closed" && ticket.Customer_Id == AccountId select ticket).ToListAsync();
            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("No tickets closed");
            }
            return tickets;
        }
        private bool TicketExists(int id) => (_context.Tickets?.Any(e => e.TicketId == id)).GetValueOrDefault();
    }
}
