using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.TicketService
{
    public interface ITicketService
    {
        Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets();
        Task<ActionResult<Ticket>> GetTicketById(int id);
        Task<IActionResult> UpdateTicket(int id, Ticket ticket);
        Task<ActionResult<Ticket>> AddTicket(Ticket ticket);
        Task<IActionResult> DeleteTicket(int id);
    }
}