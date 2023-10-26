using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;

namespace backend.Controllers
{
    [Route("api/Tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly DataContext _context;

        public TicketController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            return await _context.Tickets.ToListAsync();
        }
    }
}