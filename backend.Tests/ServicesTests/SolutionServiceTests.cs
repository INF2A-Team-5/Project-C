using Backend.SolutionService;
using Xunit;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Dto;

namespace backend.Tests.ServicesTests
{
    public class SolutionServiceTests
    {
        private readonly DataContext _db = new();
        public SolutionServiceTests() { }

        [Fact]
        public async void SolutionService_GetAllSolutions_ReturnsAllSolutions()
        {
            // Arrange
            var service = new SolutionsService(_db);

            // Act
            var result = await service.GetAllSolutions();

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<IEnumerable<Solution>>>(result); // Check if result is of type ActionResult<IEnumerable<Solution>>
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void SolutionService_GetSolutionById_ReturnsSolution(int id)
        {
            // Arrange
            var service = new SolutionsService(_db);

            // Act
            var result = await service.GetSolutionById(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Solution>>(result); // Check if result is of type ActionResult<Solution>
            Assert.IsNotType<NotFoundObjectResult>(result); // Check if result is not NotFoundObjectResult
        }

        [Theory]
        [InlineData(30)]
        [InlineData(35)]
        [InlineData(33)]
        public async void SolutionService_GetSolutionById_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new SolutionsService(_db);

            // Act
            var result = await service.GetSolutionById(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Solution>>(result); // Check if result is of type ActionResult<Solution>
            Assert.IsNotType<NotFoundObjectResult>(result.Result);  // Check if result is not NotFoundObjectResult
        }

        [Theory]
        [InlineData(4, "problemdescription", "solutiondescription", 10, 4, 4)]
        [InlineData(5, "problemdescription", "solutiondescription", 12, 4, 4)]
        [InlineData(10, "problemdescription", "solutiondescription", 13, 4, 4)]
        public async void SolutionService_UpdateSolution_ReturnsNoContent(int id, string problemDescription, string solutionDescription, int ticketId, int modelId, int machineId)
        {
            // Arrange
            var service = new SolutionsService(_db);
            var updatedSolution = new SolutionDto { SolutionId = id, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId, MachineId = machineId, ModelId = modelId };

            // Act
            var result = await service.UpdateSolution(id, updatedSolution);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<NoContentResult>(result); // Check if result is of type NotFoundResult
            Assert.IsNotType<OkObjectResult>(result); // Check if result is OkObjectResult
        }

        [Theory]
        [InlineData(1, "problemdescription", "solutiondescription", 1)]
        [InlineData(2, "problemdescription", "solutiondescription", 2)]
        [InlineData(3, "problemdescription", "solutiondescription", 3)]
        public async void SolutionService_UpdateSolution_ReturnsBadRequest(int id, string problemDescription, string solutionDescription, int ticketId)
        {
            // Arrange
            var service = new SolutionsService(_db);
            var updatedSolution = new SolutionDto { SolutionId = id, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId };

            // Act
            var result = await service.UpdateSolution(9, updatedSolution);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsNotType<OkResult>(result); // Check if result is not OkResult
        }



        [Fact]
        public async void SolutionService_AddSolution_ReturnsSolution()
        {
            // Arrange
            Department dep1 = new() { Name = "Department1" };
            MachineModel MachineModel10 = new() { Name = "Machine10", Description = "This is machine 10", Department = dep1 };
            Machine Machine10 = new() { Model = MachineModel10 };
            MachineModel MachineModel1 = new() { Name = "Machine1", Description = "This is machine 1", Department = dep1 };
            Machine Machine1 = new() { Model = MachineModel1 };
            Account Client = new() { Name = "clientname", Password = "clientpw", Class = AccountType.Client };
            Customer customer = new() { Account = Client };
            Ticket ticket1 = new() { Model = MachineModel1, Machine = Machine1, Customer = customer, Title = "test", Priority = "Critical", Status = "In Process", Date_Created = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"), Problem = "test", HaveTried = "Test", MustBeDoing = "test", Solution = "Test", PhoneNumber = "0612345678" };
            SolutionDto solution1 = new() { ProblemDescription = "Device stopped working", SolutionDescription = "Press the green button", TicketId = ticket1.TicketId, ModelId = MachineModel10.ModelId, MachineId = Machine10.MachineId };

            var service = new SolutionsService(_db);
            // var newSolution = new Solution { SolutionId = solutionId, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = 1 };

            // Act
            var result = await service.AddSolution(solution1);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Solution>>(result); // Check if result is of type ActionResult<Solution>
        }

        [Theory]
        [InlineData(null)]
        public async void SolutionService_DeleteSolution_ReturnsNoContent(int id)
        {
            // Arrange
            var service = new SolutionsService(_db);

            // Act
            var result = await service.DeleteSolution(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<NotFoundResult>(result); // Check if result is of type NoContentResult

        }
    }
}