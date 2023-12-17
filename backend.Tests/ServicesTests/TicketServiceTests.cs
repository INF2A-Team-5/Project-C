using Backend.TicketService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;

namespace backend.Tests.ServicesTests
{
    public class TicketServiceTests
    {
        private readonly DataContext _db = new();
        public TicketServiceTests() { }

        [Fact]
        public async void TicketService_GetAllTickets_ReturnsAllTickets()
        {
            // Arrange
            var service = new TicketService(_db);

            // Act
            var result = await service.GetAllTickets();

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
        [InlineData(26)]
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
        [InlineData(1, 1, 1, 1, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(2, 2, 2, 2, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(3, 3, 3, 3, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        public async void TicketService_UpdateTicket_ReturnsNoContent(int ticketId, int machineId, int customerId, int employee_Id, string title, string priority, string status, string problem,
                                                                    string havetried, string mustbedoing, string date, string solution, string phonenumber, string notes, string[] files)
        {
            // Arrange
            var service = new TicketService(_db);
            Ticket updatedTicket = new()
            {
                TicketId = ticketId,
                Machine_Id = machineId,
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
        [InlineData(1, 1, 1, 1, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(2, 2, 2, 2, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(3, 3, 3, 3, "updated ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        public async void TicketService_UpdateTicket_ReturnsBadRequest(int ticketId, int machineId, int customerId, int employee_Id, string title, string priority, string status, string problem,
                                                                    string havetried, string mustbedoing, string date, string solution, string phonenumber, string notes, string[] files)
        {
            // Arrange
            var service = new TicketService(_db);
            Ticket updatedTicket = new()
            {
                TicketId = ticketId,
                Machine_Id = machineId,
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
            Assert.IsNotType<NoContentResult>(result);
            Assert.IsType<BadRequestResult>(result);
        }

        [Theory]
        [InlineData(1, 1, 1, "new ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(2, 2, 2, "new ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(3, 3, 3, "new ticket", "priority", "status", "problem", "havetried", "mustbedoing", "01-01-2022", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        public async void TicketService_AddTicket_ReturnsTicket(int machineId, int customerId, int employee_Id, string title, string priority, string status, string problem,
                                                                    string havetried, string mustbedoing, string date, string solution, string phonenumber, string notes, string[] files)
        {
            // Arrange
            var service = new TicketService(_db);
            Ticket newTicket = new()
            {
                Machine_Id = machineId,
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
            var result = await service.AddTicket(newTicket);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Ticket>>(result);
        }

        [Theory]
        [InlineData(23)]
        [InlineData(24)]
        [InlineData(25)]
        public async void TicketService_DeleteTicket_ReturnsNoContent(int id)
        {
            // Arrange
            var service = new TicketService(_db);

            // Act
            var result = await service.DeleteTicket(id);

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