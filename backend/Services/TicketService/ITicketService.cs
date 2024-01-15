using Backend.Dto;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.TicketService
{
    public interface ITicketService
    {
        Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets(int AccountId, bool archived);
        Task<ActionResult<Ticket>> GetTicketById(int id);
        Task<ActionResult<IEnumerable<Ticket>>> GetTicketsByArchived(bool archived);
        Task<IActionResult> UpdateTicket(int id, TicketDto ticket);
        Task<ActionResult<Ticket>> AddTicket(TicketDto ticket);
        Task<IActionResult> DeleteTicket(int id);
        Task<ActionResult<IEnumerable<Ticket>>> GetAssignedTickets(int AccountId);
        Task<ActionResult<IEnumerable<Ticket>>> GetUnasignedTickets(int AccountId);
        Task<ActionResult<IEnumerable<Ticket>>> GetClosedTickets(int AccountId);
        Task<ActionResult<IEnumerable<Ticket>>> GetClosedTicketsPerCustomer(int AccountId);

    }
}