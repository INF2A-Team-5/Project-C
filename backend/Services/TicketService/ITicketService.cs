using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.TicketService
{
    public interface ITicketService
    {
        Task<ActionResult<IEnumerable<Ticket>>> GetTickets();
        Task<ActionResult<Ticket>> GetTicketById(int id);
        Task<IActionResult> UpdateTicket(int id, Ticket ticket);
        Task<ActionResult<Ticket>> AddTicket(Ticket ticket);
        Task<IActionResult> DeleteTicket(int id);
    }
}