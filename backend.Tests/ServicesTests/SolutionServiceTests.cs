using Backend.SolutionService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.ServicesTests
{
    public class SolutionServiceTests
    {
        private readonly ISolutionService _fakeSolutionService;
        public SolutionServiceTests()
        {
            _fakeSolutionService = A.Fake<ISolutionService>();
        }

        [Fact]
        public async void SolutionService_GetAllSolutions_ReturnsAllSolutions()
        {
            // Arrange
            A.CallTo(() => _fakeSolutionService.GetAllSolutions()).Returns(new List<Solution>());
            // Act
            var result = await _fakeSolutionService.GetAllSolutions();
            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Solution>>(result.Value);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void SolutionService_GetSolutionById_ReturnsSolution(int id)
        {
            // Arrange
            A.CallTo(() => _fakeSolutionService.GetSolutionById(id)).Returns(new Solution());
            // Act
            var result = await _fakeSolutionService.GetSolutionById(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<Solution>(result.Value);
            Assert.IsNotType<NotFoundObjectResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void SolutionService_GetSolutionById_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeSolutionService.GetSolutionById(id)).Returns(new Solution());
            // Act
            var result = await _fakeSolutionService.GetSolutionById(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Solution>>(result);
            Assert.IsNotType<Account>(result);
        }

        [Theory]
        [InlineData(1, "problemdescription" , "solutiondescription", 1)]
        [InlineData(2, "problemdescription" , "solutiondescription", 2)]
        [InlineData(3, "problemdescription" , "solutiondescription", 3)]
        public async void SolutionService_UpdateSolution_ReturnsNoContent(int id, string problemDescription, string solutionDescription, int ticketId)
        {
            // Arrange
            var newProblemDescription = "newProblemDescription";
            var newSolutionDescription = "newSolutionDescription";
            var fakeSolution = new Solution {SolutionId = id, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId };
            var updatedSolution = new Solution {SolutionId = id, ProblemDescription = newProblemDescription, SolutionDescription = newSolutionDescription, TicketId = ticketId };
            A.CallTo(() => _fakeSolutionService.UpdateSolution(id, fakeSolution)).Returns(new OkObjectResult(fakeSolution));
            // Act
            var result = await _fakeSolutionService.UpdateSolution(id, updatedSolution);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1, "problemdescription" , "solutiondescription", 1)]
        [InlineData(2, "problemdescription" , "solutiondescription", 2)]
        [InlineData(3, "problemdescription" , "solutiondescription", 3)]
        public async void SolutionService_UpdateSolution_ReturnsBadRequest(int id, string problemDescription, string solutionDescription, int ticketId)
        {
            // Arrange
            var wrongId = 4;
            var newProblemDescription = "newProblemDescription";
            var newSolutionDescription = "newSolutionDescription";
            var fakeSolution = new Solution {SolutionId = id, ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId };
            var updatedSolution = new Solution {SolutionId = id, ProblemDescription = newProblemDescription, SolutionDescription = newSolutionDescription, TicketId = ticketId };
            A.CallTo(() => _fakeSolutionService.UpdateSolution(id, fakeSolution)).Returns(new OkObjectResult(fakeSolution));
            // Act
            var result = await _fakeSolutionService.UpdateSolution(wrongId, updatedSolution);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkResult>(result);
        }

        [Theory]
        [InlineData("problemdescription" , "solutiondescription", 1)]
        [InlineData("problemdescription" , "solutiondescription", 2)]
        [InlineData("problemdescription" , "solutiondescription", 3)]
        public async void SolutionService_AddSolution_ReturnsSolution(string problemDescription, string solutionDescription, int ticketId)
        {
            // Arrange
            var fakeSolution = new Solution {ProblemDescription = problemDescription, SolutionDescription = solutionDescription, TicketId = ticketId };
            A.CallTo(() => _fakeSolutionService.AddSolution(fakeSolution)).Returns(new OkObjectResult(fakeSolution));
            // Act
            var result = await _fakeSolutionService.AddSolution(fakeSolution);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void SolutionService_DeleteSolution_ReturnsNoContent(int id)
        {
            // Arrange
            A.CallTo(() => _fakeSolutionService.DeleteSolution(id)).Returns(new OkObjectResult(new Solution()));
            // Act
            var result = await _fakeSolutionService.DeleteSolution(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void SolutionService_DeleteSolution_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeSolutionService.DeleteSolution(id)).Returns(new OkObjectResult(new Solution()));
            // Act
            var result = await _fakeSolutionService.DeleteSolution(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkObjectResult>(result);
        }
    }
}