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
        [HttpGet] public async Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets() => await _ticketService.GetAllTickets();
        [HttpGet("{id}")] public async Task<ActionResult<Ticket>> GetTicketById(int id) => await _ticketService.GetTicketById(id);
        [HttpGet("/GetTicketByDepartment")] public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketByDepartment(string Departmentname) => await _ticketService.GetTicketByDepartment(Departmentname);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateTicket(int id, Ticket ticket) => await _ticketService.UpdateTicket(id, ticket);
        [HttpPost] public async Task<ActionResult<Ticket>> AddTicket(Ticket newTicket) => await _ticketService.AddTicket(newTicket);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteTicket(int id) => await _ticketService.DeleteTicket(id);
    }
}