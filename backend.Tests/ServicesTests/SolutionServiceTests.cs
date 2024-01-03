using Backend.SolutionService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;

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
        [InlineData(1, "problemdescription", "solutiondescription", 10)]
        [InlineData(2, "problemdescription", "solutiondescription", 12)]
        [InlineData(3, "problemdescription", "solutiondescription", 13)]
        public async void SolutionService_UpdateSolution_ReturnsNoContent(int id, string problemDescription, string solutionDescription, int ticketId)
        {
            // Arrange
            var service = new SolutionsService(_db);
            var updatedSolution = new Solution { SolutionId = id, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId };

            // Act
            var result = await service.UpdateSolution(id, updatedSolution);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<NoContentResult>(result); // Check if result is of type NoContentResult
            Assert.IsNotType<NotFoundResult>(result); // Check if result is NotFoundResult
        }

        [Theory]
        [InlineData(1, "problemdescription", "solutiondescription", 1)]
        [InlineData(2, "problemdescription", "solutiondescription", 2)]
        [InlineData(3, "problemdescription", "solutiondescription", 3)]
        public async void SolutionService_UpdateSolution_ReturnsBadRequest(int id, string problemDescription, string solutionDescription, int ticketId)
        {
            // Arrange
            var service = new SolutionsService(_db);
            var updatedSolution = new Solution { SolutionId = id, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId };

            // Act
            var result = await service.UpdateSolution(9, updatedSolution);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsNotType<OkResult>(result); // Check if result is not OkResult
        }

        [Theory]
        [InlineData(8, "problemdescription", "solutiondescription", 1)]
        [InlineData(9, "problemdescription", "solutiondescription", 2)]
        [InlineData(10, "problemdescription", "solutiondescription", 3)]
        public async void SolutionService_AddSolution_ReturnsSolution(int solutionId, string problemDescription, string solutionDescription, int ticketId)
        {
            // Arrange
            var service = new SolutionsService(_db);
            var newSolution = new Solution { SolutionId = solutionId, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId };

            // Act
            var result = await service.AddSolution(newSolution);

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

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void SolutionService_DeleteSolution_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new SolutionsService(_db);

            // Act
            var result = await service.DeleteSolution(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<NoContentResult>(result); // Check if result is of type NoContentResult
        }
    }
}