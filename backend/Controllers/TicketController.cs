using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.TicketService;

namespace Backend.Controllers
{
    // [Authorize]
    [Route("api/Tickets")]
    [ApiController]
    public class TicketController
    {
        private readonly ITicketService _ticketService;
        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }
        [HttpGet] public async Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets(int AccountId) => await _ticketService.GetAllTickets(AccountId);
        [HttpGet("{id}")] public async Task<ActionResult<Ticket>> GetTicketById(int id) => await _ticketService.GetTicketById(id);
        // [HttpGet("/GetTicketByDepartment")] public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketByDepartment(int AccountId) => await _ticketService.GetTicketByDepartment(AccountId);
        [HttpGet("/GetAssignedTickets")] public async Task<ActionResult<IEnumerable<Ticket>>> GetAssignedTickets(int AccountId) => await _ticketService.GetAssignedTickets(AccountId);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateTicket(int id, Ticket ticket) => await _ticketService.UpdateTicket(id, ticket);
        [HttpPost] public async Task<ActionResult<Ticket>> AddTicket(Ticket newTicket) => await _ticketService.AddTicket(newTicket);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteTicket(int id) => await _ticketService.DeleteTicket(id);
        [HttpGet("/GetUnassignedTickets")] public async Task<ActionResult<IEnumerable<Ticket>>> GetUnasignedTickets(int AccountId) => await _ticketService.GetUnasignedTickets(AccountId);
        [HttpGet("/GetClosedTickets")] public async Task<ActionResult<IEnumerable<Ticket>>> GetClosedTickets(int AccountId) => await _ticketService.GetClosedTickets(AccountId);
        [HttpGet("/GetClosedTicketsPerCustomer")] public async Task<ActionResult<IEnumerable<Ticket>>> GetClosedTicketsPerCustomer(int AccountId) => await _ticketService.GetClosedTicketsPerCustomer(AccountId);
        // [HttpGet("/GetCustomerTickets")] public async Task<ActionResult<IEnumerable<Ticket>>> GetCustomerTickets(int AccountId) => await _ticketService.GetCustomerTickets(AccountId);
    }
}
