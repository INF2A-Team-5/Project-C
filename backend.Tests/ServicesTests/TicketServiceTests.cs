using Backend.TicketService;
using Xunit;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Dto;

namespace backend.Tests.ServicesTests
{
    public class TicketServiceTests
    {
        private readonly DataContext _db = new();
        public TicketServiceTests() { }

        [Theory]
        [InlineData(1, false)]
        [InlineData(2, false)]
        [InlineData(3, false)]
        public async void TicketService_GetAllTickets_ReturnsAllTickets(int id, bool archived)
        {
            // Arrange
            var service = new TicketService(_db);

            // Act
            var result = await service.GetAllTickets(id, archived);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<IEnumerable<Ticket>>>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void TicketService_GetTicketById_ReturnsTicket(int id)
        {
            // Arrange
            var service = new TicketService(_db);

            // Act
            var result = await service.GetTicketById(id);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Ticket>>(result);
        }

        [Theory]
        [InlineData(66)] //
        [InlineData(30)]
        [InlineData(35)]
        public async void TicketService_GetTicketById_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new TicketService(_db);

            // Act
            var result = await service.GetTicketById(id);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Ticket>>(result);
            Assert.IsNotType<Ticket>(result.Value);
        }

        [Theory]
        [InlineData(2, 2, 2, 2, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", new string[] { "notes" }, new string[] { "file1", "file2", "file3" })]
        [InlineData(3, 3, 3, 3, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", new string[] { "notes" }, new string[] { "file1", "file2", "file3" })]
        public async void TicketService_UpdateTicket_ReturnsNoContent(int ticketId, int machineId, int customerId, int employee_Id, string title, string priority, string status, string problem,
                                                                    string havetried, string mustbedoing, string date, string solution, string phonenumber, string[] notes, string[] files)
        {
            // Arrange
            var service = new TicketService(_db);
            TicketDto updatedTicket = new()
            {
                TicketId = ticketId,
                ModelId = machineId,
                Customer_Id = customerId,
                Employee_Id = employee_Id,
                Title = title,
                Priority = priority,
                Status = status,
                Problem = problem,
                HaveTried = havetried,
                MustBeDoing = mustbedoing,
                Date_Created = date,
                Solution = solution,
                PhoneNumber = phonenumber,
                Notes = notes,
                Files = files
            };

            // Act
            var result = await service.UpdateTicket(ticketId, updatedTicket);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<NoContentResult>(result);
        }

        [Theory]
        [InlineData(1, 1, 1, 1, "new ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", new string[] { "notes" }, new string[] { "file1", "file2", "file3" })]
        [InlineData(2, 2, 2, 2, "new ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456788", new string[] { "notes" }, new string[] { "file1", "file2", "file3" })]
        [InlineData(3, 3, 3, 3, "new ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456787", new string[] { "notes" }, new string[] { "file1", "file2", "file3" })]
        public async void TicketService_AddTicket_ReturnsTicket(int ModelId, int machineId, int customerId, int employee_Id, string title, string priority, string status, string problem,
                                                                    string havetried, string mustbedoing, string date, string solution, string phonenumber, string[] notes, string[] files)
        {
            // Arrange
            var service = new TicketService(_db);
            TicketDto updatedTicket = new()
            {
                Machine_Id = machineId,
                ModelId = ModelId,
                Customer_Id = customerId,
                Employee_Id = employee_Id,
                Title = title,
                Priority = priority,
                Status = status,
                Problem = problem,
                HaveTried = havetried,
                MustBeDoing = mustbedoing,
                Date_Created = date,
                Solution = solution,
                PhoneNumber = phonenumber,
                Notes = notes,
                Files = files
            };

            // Act
            var result = await service.UpdateTicket(15, updatedTicket);


            // Assert
            Assert.NotNull(result);
            Assert.IsType<NoContentResult>(result);
        }

        [Theory]
        [InlineData(30)]
        [InlineData(40)]
        [InlineData(50)]
        public async void TicketService_DeleteTicket_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new TicketService(_db);

            // Act
            var result = await service.DeleteTicket(id);

            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<NoContentResult>(result);
        }
    }
}