using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;

namespace Backend.TicketService
{
    public class TicketService : ControllerBase, ITicketService
    {
        private readonly DataContext _context;

        public TicketService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            return await _context.Tickets.ToListAsync();
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

        public async Task<IActionResult> UpdateTicket(int id, Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest();
            }
            _context.Entry(ticket).State = EntityState.Modified;
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

        public async Task<ActionResult<Ticket>> AddTicket(Ticket ticket)
        {
            if (_context.Tickets == null)
            {
                return Problem("Entity set 'DataContext.Tickets'  is null.");
            }
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicketById), new { id = ticket.TicketId }, ticket);
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
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketByDepartment(int AccountId)
        {
            if (_context.Tickets == null || _context.Departments == null || _context.Machines == null)
            {
                return NotFound("No data found in db");
            }
            int departmentId = await (from employees in _context.Employees where employees.AccountId == AccountId select employees.DepartmentId).FirstOrDefaultAsync();
            var tickets = await (from ticket in _context.Tickets from machine in _context.Machines where ticket.Machine_Id == machine.MachineId && machine.DepartmentId == departmentId select ticket).ToListAsync();

            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("No tickets under this department");
            }
            return tickets;
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetAssignedTickets(int AccountId)
        {
            if (_context.Tickets == null || _context.Departments == null || _context.Machines == null || _context.Employees == null)
            {
                return NotFound("No data found in db");
            }
            var employee = await (from employees in _context.Employees where employees.AccountId == AccountId select employees).FirstOrDefaultAsync();
            if (employee == null)
            {
                return NotFound("Employee does not exist");
            }
            var tickets = await (from ticket in _context.Tickets where ticket.Employee_Id == employee.EmployeeId select ticket).ToListAsync();
            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("No tickets assigned");
            }
            return tickets;
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetUnasignedTickets()
        {
            if (_context.Tickets == null)
            {
                return NotFound("No data found in db");
            }
            var tickets = await (from ticket in _context.Tickets where ticket.Employee_Id == null select ticket).ToListAsync();
            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("No tickets assigned");
            }
            return tickets;
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetClosedTickets()
        {
            if (_context.Tickets == null)
            {
                return NotFound("No data found in db");
            }
            var tickets = await (from ticket in _context.Tickets where ticket.Status == "Closed" select ticket).ToListAsync();
            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("No tickets closed");
            }
            return tickets;
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> GetCustomerTickets(int AccountId)
        {
            if (_context.Tickets == null  || _context.Machines == null || _context.Employees == null || _context.Customers == null)
            {
                return NotFound("No data found in db");
            }
            var customer = await (from customers in _context.Customers where customers.AccountId == AccountId select customers).FirstOrDefaultAsync();
            if (customer == null)
            {
                return NotFound("Customer does not exist");
            }
            var tickets = await (from ticket in _context.Tickets where ticket.Customer_Id == customer.AccountId select ticket).ToListAsync();
            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("No tickets found");
            }
            return tickets;
        }
        private bool TicketExists(int id) => (_context.Tickets?.Any(e => e.TicketId == id)).GetValueOrDefault();
    }
}
