using Backend.TicketService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.ServicesTests
{
    public class TicketServiceTests
    {
        private readonly ITicketService _fakeTicketService;
        public TicketServiceTests()
        {
            _fakeTicketService = A.Fake<ITicketService>();
        }

        [Fact]
        public async void TicketService_GetAllTickets_ReturnsAllTickets()
        {
            // Arrange
            A.CallTo(() => _fakeTicketService.GetAllTickets()).Returns(new List<Ticket>());
            // Act
            var result = await _fakeTicketService.GetAllTickets();
            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Ticket>>(result.Value);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void TicketService_GetTicketById_ReturnsTicket(int id)
        {
            // Arrange
            A.CallTo(() => _fakeTicketService.GetTicketById(id)).Returns(new Ticket());
            // Act
            var result = await _fakeTicketService.GetTicketById(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<Ticket>(result.Value);
            Assert.IsNotType<NotFoundObjectResult>(result);
        }

        [Theory]
        [InlineData(1, 1, 1, 1, "priority", "status", "problem", "havetried", "mustbedoing", "2022-01-01", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(2, 2, 2, 2, "priority", "status", "problem", "havetried", "mustbedoing", "2022-01-01", "solution", "123456789", "notes", new string[] {"file1", "file2", "file3"})]
        [InlineData(3, 3, 3, 3, "priority", "status", "problem", "havetried", "mustbedoing", "2022-01-01", "solution", "123456789", "notes", new string[] {"file1", "file2", "file3"})]
        public async void TicketService_UpdateTicket_ReturnsNoContent(int ticketId, int machineId, int customerId, int assignedId, string priority, string status, string problem, 
                                                                    string havetried, string mustbedoing, DateTime date, string solution, string phonenumber, string notes, string[] files)
        {
            // Arrange
            var newPriority = "newPriority";
            var newStatus = "newStatus";
            var newProblem = "newProblem";
            var newHavetried = "newHavetried";
            var newMustbedoing = "newMustbedoing";
            var newSolution = "newSolution";
            var newPhonenumber = "newPhonenumber";
            var newNotes = "newNotes";
            var newFiles = new string[] {"newFile1", "newFile2", "newFile3"};
            var fakeTicket = new Ticket {TicketId = ticketId, Machine_Id = machineId, Customer_Id = customerId, Assigned_Id = assignedId, Priority = priority, Status = status, Problem = problem, 
                                        HaveTried = havetried, MustBeDoing = mustbedoing, Date_Created = date, Solution = solution, PhoneNumber = phonenumber, Notes = notes, Files = files };
            A.CallTo(() => _fakeTicketService.UpdateTicket(ticketId, fakeTicket)).Returns(new OkObjectResult(fakeTicket));
            // Act
            var result = await _fakeTicketService.UpdateTicket(ticketId, new Ticket { Machine_Id = machineId, Customer_Id = customerId, Assigned_Id = assignedId, Priority = newPriority, Status = newStatus, Problem = newProblem, 
                                                            HaveTried = newHavetried, MustBeDoing = newMustbedoing, Date_Created = date, Solution = newSolution, PhoneNumber = newPhonenumber, Notes = newNotes, Files = newFiles});
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
        }

        [Theory]
        [InlineData(1, 1, 1, "priority", "status", "problem", "havetried", "mustbedoing", "2022-01-01", "solution", "123456789", "notes", new string[] { "file1", "file2", "file3" })]
        [InlineData(2, 2, 2, "priority", "status", "problem", "havetried", "mustbedoing", "2022-01-01", "solution", "123456789", "notes", new string[] {"file1", "file2", "file3"})]
        [InlineData(3, 3, 3, "priority", "status", "problem", "havetried", "mustbedoing", "2022-01-01", "solution", "123456789", "notes", new string[] {"file1", "file2", "file3"})]
        public async void TicketService_AddTicket_ReturnsTicket(int machineId, int customerId, int assignedId, string priority, string status, string problem, 
        string havetried, string mustbedoing, DateTime date, string solution, string phonenumber, string notes, string[] files)
        {
            // Arrange
            var fakeTicket = new Ticket { Machine_Id = machineId, Customer_Id = customerId, Assigned_Id = assignedId, Priority = priority, Status = status, Problem = problem, 
            HaveTried = havetried, MustBeDoing = mustbedoing, Date_Created = date, Solution = solution, PhoneNumber = phonenumber, Notes = notes, Files = files };
            A.CallTo(() => _fakeTicketService.AddTicket(fakeTicket)).Returns(new OkObjectResult(fakeTicket));
            // Act
            var result = await _fakeTicketService.AddTicket(fakeTicket);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void TicketService_DeleteTicket_ReturnsNoContent(int id)
        {
            // Arrange
            A.CallTo(() => _fakeTicketService.DeleteTicket(id)).Returns(new OkObjectResult(id));
            // Act
            var result = await _fakeTicketService.DeleteTicket(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }
    }
}