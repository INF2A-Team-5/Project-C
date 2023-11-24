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

        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
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

        private bool TicketExists(int id) => (_context.Tickets?.Any(e => e.TicketId == id)).GetValueOrDefault();
    }
}
