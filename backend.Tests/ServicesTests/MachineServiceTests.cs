using Backend.MachineService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.ServicesTests
{
    public class MachineServiceTests
    {
        private readonly IMachineService _fakeMachineService;
        public MachineServiceTests()
        {
            _fakeMachineService = A.Fake<IMachineService>();
        }

        [Fact]
        public async void MachineService_GetAllMachines_ReturnsAllMachines()
        {
            // Arrange
            A.CallTo(() => _fakeMachineService.GetAllMachines()).Returns(new List<Machine>());
            // Act
            var result = await _fakeMachineService.GetAllMachines();
            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Machine>>(result.Value);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void MachineService_GetMachineById_ReturnsMachine(int id)
        {
            // Arrange
            A.CallTo(() => _fakeMachineService.GetMachineById(id)).Returns(new Machine());
            // Act
            var result = await _fakeMachineService.GetMachineById(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<Machine>(result.Value);
            Assert.IsNotType<NotFoundObjectResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void MachineService_GetMachineById_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeMachineService.GetMachineById(id)).Returns(new Machine());
            // Act
            var result = await _fakeMachineService.GetMachineById(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Machine>>(result);
            Assert.IsNotType<Machine>(result.Value);
        }

        [Theory]
        [InlineData(1, "machinename", "machinedescription", 1)]
        [InlineData(2, "machinename", "machinedescription", 2)]
        [InlineData(3, "machinename", "machinedescription", 3)]
        public async void MachineService_UpdateMachine_ReturnsNoContent(int id, string name, string description, int accountId)
        {
            // Arrange
            var newName = "newName";
            var newDescription = "newDescription";
            var fakeMachine = new Machine {MachineId = id, Name = name, Description = description, AccountId = accountId };
            var updatedMachine = new Machine {MachineId = id, Name = newName, Description = newDescription, AccountId = accountId };
            A.CallTo(() => _fakeMachineService.UpdateMachine(id, fakeMachine)).Returns(new OkObjectResult(fakeMachine));
            // Act
            var result = await _fakeMachineService.UpdateMachine(id, updatedMachine);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1, "machinename", "machinedescription", 1)]
        [InlineData(2, "machinename", "machinedescription", 2)]
        [InlineData(3, "machinename", "machinedescription", 3)]
        public async void MachineService_UpdateMachine_ReturnsBadRequest(int id, string name, string description, int accountId)
        {
            // Arrange
            var wrongId = 4;
            var newName = "newName";
            var newDescription = "newDescription";
            var fakeMachine = new Machine {MachineId = id, Name = name, Description = description, AccountId = accountId };
            var updatedMachine = new Machine {MachineId = id, Name = newName, Description = newDescription, AccountId = accountId };
            A.CallTo(() => _fakeMachineService.UpdateMachine(id, fakeMachine)).Returns(new OkObjectResult(fakeMachine));
            // Act
            var result = await _fakeMachineService.UpdateMachine(wrongId, updatedMachine);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkResult>(result);
        }

        [Theory]
        [InlineData("machinename", "machinedescription", 1)]
        [InlineData("machinename", "machinedescription", 2)]
        [InlineData("machinename", "machinedescription", 3)]
        public async void MachineService_AddMachine_ReturnsCreatedAtActionResult(string name, string description, int accountId)
        {
            // Arrange
            var fakeMachine = new Machine { Name = name, Description = description, AccountId = accountId };
            A.CallTo(() => _fakeMachineService.AddMachine(fakeMachine)).Returns(new OkObjectResult(fakeMachine));
            // Act
            var result = await _fakeMachineService.AddMachine(fakeMachine);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<ObjectResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void MachineService_GetMachinePerAccountId_ReturnsMachine(int id)
        {
            // Arrange
            A.CallTo(() => _fakeMachineService.GetMachinePerAccountId(id)).Returns(new List<Machine>());
            // Act
            var result = await _fakeMachineService.GetMachinePerAccountId(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Machine>>(result.Value);
            Assert.IsNotType<NotFoundObjectResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void MachineService_GetMachinePerAccountId_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeMachineService.GetMachinePerAccountId(id)).Returns(new List<Machine>());
            // Act
            var result = await _fakeMachineService.GetMachinePerAccountId(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<IEnumerable<Machine>>>(result);
            Assert.IsNotType<OkObjectResult>(result);
            Assert.IsNotType<OkResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void MachineService_DeleteMachine_ReturnsNoContent(int id)
        {
            // Arrange
            A.CallTo(() => _fakeMachineService.DeleteMachine(id)).Returns(new OkObjectResult(new Machine()));
            // Act
            var result = await _fakeMachineService.DeleteMachine(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void MachineService_DeleteMachine_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeMachineService.DeleteMachine(id)).Returns(new OkObjectResult(new Machine()));
            // Act
            var result = await _fakeMachineService.DeleteMachine(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkResult>(result);
        }
    }
}