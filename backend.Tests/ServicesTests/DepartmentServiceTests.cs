using Backend.DepartmentService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.ServicesTests
{
    public class DepartmentServiceTests
    {
        private readonly IDepartmentService _fakeDepartmentService;
        public DepartmentServiceTests()
        {
            _fakeDepartmentService = A.Fake<IDepartmentService>();
        }

        [Fact]
        public async void DepartmentService_GetAllDepartments_ReturnsAllDepartments()
        {
            // Arrange
            A.CallTo(() => _fakeDepartmentService.GetAllDepartments()).Returns(new List<Department>());
            // Act
            var result = await _fakeDepartmentService.GetAllDepartments();
            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Department>>(result.Value);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void DepartmentService_GetDepartmentById_ReturnsDepartment(int id)
        {
            // Arrange
            A.CallTo(() => _fakeDepartmentService.GetDepartmentById(id)).Returns(new Department());
            // Act
            var result = await _fakeDepartmentService.GetDepartmentById(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<Department>(result.Value);
            Assert.IsNotType<NotFoundObjectResult>(result);

        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void DepartmentService_GetDepartmentById_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeDepartmentService.GetDepartmentById(id)).Returns(new Department());
            // Act
            var result = await _fakeDepartmentService.GetDepartmentById(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Department>>(result);
            Assert.IsNotType<Department>(result.Value);

        }

        [Theory]
        [InlineData(1, "departmentone")]
        [InlineData(2, "departmenttwo")]
        [InlineData(3, "departmentthree")]
        public async void DepartmentService_UpdateDepartment_ReturnsNoContent(int id, string name)
        {
            // Arrange
            var newName = "newName";
            var fakeDepartment = new Department {DepartmentId = id, Name = name };
            var updatedDepartment = new Department {DepartmentId = id, Name = newName };
            A.CallTo(() => _fakeDepartmentService.UpdateDepartment(id, fakeDepartment)).Returns(new OkObjectResult(fakeDepartment));
            // Act
            var result = await _fakeDepartmentService.UpdateDepartment(id, updatedDepartment);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1, "departmentone")]
        [InlineData(2, "departmenttwo")]
        [InlineData(3, "departmentthree")]
        public async void DepartmentService_UpdateDepartment_ReturnsBadRequest(int id, string name)
        {
            // Arrange
            var newName = "newName";
            var wrongId = 4;
            var fakeDepartment = new Department {DepartmentId = id, Name = name };
            var updatedDepartment = new Department {DepartmentId = id, Name = newName };
            A.CallTo(() => _fakeDepartmentService.UpdateDepartment(id, fakeDepartment)).Returns(new OkObjectResult(fakeDepartment));
            // Act
            var result = await _fakeDepartmentService.UpdateDepartment(wrongId,updatedDepartment);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkObjectResult>(result);
            Assert.IsNotType<OkResult>(result);
        }

        [Theory]
        [InlineData("departmentone")]
        [InlineData("departmenttwo")]
        [InlineData("departmentthree")]
        public async void DepartmentService_AddDepartment_ReturnsCreatedAtActionResult(string name)
        {
            // Arrange
            var fakeDepartment = new Department {Name = name };
            A.CallTo(() => _fakeDepartmentService.AddDepartment(fakeDepartment)).Returns(new OkObjectResult(fakeDepartment));
            // Act
            var result = await _fakeDepartmentService.AddDepartment(fakeDepartment);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Department>>(result);
            Assert.IsNotType<ObjectResult>(result);
            
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void DepartmentService_DeleteDepartment_ReturnsNoContent(int id)
        {
            // Arrange
            A.CallTo(() => _fakeDepartmentService.DeleteDepartment(id)).Returns(new OkResult());
            // Act
            var result = await _fakeDepartmentService.DeleteDepartment(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void DepartmentService_DeleteDepartment_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeDepartmentService.DeleteDepartment(id)).Returns(new OkResult());
            // Act
            var result = await _fakeDepartmentService.DeleteDepartment(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkObjectResult>(result);
        }
    }
}