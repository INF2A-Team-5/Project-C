using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.TicketService
{
    public interface ITicketService
    {
        Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets();
        Task<ActionResult<Ticket>> GetTicketById(int id);
        Task<ActionResult<IEnumerable<Ticket>>> GetTicketsByArchived(bool archived);
        Task<IActionResult> UpdateTicket(int id, Ticket ticket);
        Task<ActionResult<Ticket>> AddTicket(Ticket ticket);
        Task<IActionResult> DeleteTicket(int id);
        Task<ActionResult<IEnumerable<Ticket>>> GetTicketByDepartment(int Departmentname);
        Task<ActionResult<IEnumerable<Ticket>>> GetAssignedTickets(int AccountId);
    }
}