using Backend.DepartmentService;
using Xunit;
using Backend.Entities;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

namespace backend.Tests.ServicesTests
{
    public class DepartmentServiceTests
    {
        private DataContext _db = new();
        public DepartmentServiceTests() { }

        [Fact]
        public async void DepartmentService_GetAllDepartments_ReturnsAllDepartments()
        {
            // Arrange
            var service = new DepartmentService(_db);

            // Act
            var result = await service.GetAllDepartments();

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<IEnumerable<Department>>>(result); // Check if result is of type ActionResult<IEnumerable<Department>>
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void DepartmentService_GetDepartmentById_ReturnsDepartment(int id)
        {
            // Arrange
            var service = new DepartmentService(_db);

            // Act
            var result = await service.GetDepartmentById(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Department>>(result); // Check if result is of type ActionResult<Department>
            Assert.IsNotType<NotFoundObjectResult>(result); // Check if result is not NotFoundObjectResult
        }

        [Theory]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        public async void DepartmentService_GetDepartmentById_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new DepartmentService(_db);

            // Act
            var result = await service.GetDepartmentById(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Department>>(result); // Check if result is of type ActionResult<Department>
            Assert.IsNotType<NotFoundObjectResult>(result.Result);  // Check if result is not NotFoundObjectResult
        }

        [Theory]
        [InlineData(1, "departmentone")]
        [InlineData(2, "departmenttwo")]
        [InlineData(3, "departmentthree")]
        public async void DepartmentService_UpdateDepartment_ReturnsNoContent(int id, string name)
        {
            // Arrange
            var service = new DepartmentService(_db);
            var updatedDepartment = new Department { DepartmentId = id, Name = name };
            // Act
            var result = await service.UpdateDepartment(id, updatedDepartment);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<NoContentResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(7, "departmentone")]
        [InlineData(9, "departmenttwo")]
        [InlineData(11, "departmentthree")]
        public async void DepartmentService_UpdateDepartment_ReturnsBadRequest(int id, string name)
        {
            // Arrange
            var service = new DepartmentService(_db);
            var updatedDepartment = new Department { DepartmentId = id, Name = name };

            // Act
            var result = await service.UpdateDepartment(id, updatedDepartment);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsNotType<OkObjectResult>(result);
            Assert.IsNotType<OkResult>(result); // Check if result is not OkResult
        }

        [Theory]
        [InlineData(12, "departmentone")]
        [InlineData(13, "departmenttwo")]
        [InlineData(16, "departmentthree")]
        public async void DepartmentService_AddDepartment_ReturnsCreatedAtActionResult(int id, string name)
        {
            // Arrange
            var service = new DepartmentService(_db);
            var newDepartment = new Department { DepartmentId = id, Name = name };

            // Act
            var result = await service.AddDepartment(newDepartment);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Department>>(result); // Check if result is of type ActionResult<Department>
            Assert.IsNotType<ObjectResult>(result); // Check if result is not ObjectResult
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        // ------------------------------------------------
        // Does not work!!! Has beef with Employees table
        // ------------------------------------------------
        public async void DepartmentService_DeleteDepartment_ReturnsNoContent(int id)
        {
            // Arrange
            var service = new DepartmentService(_db);

            // Act
            var result = await service.DeleteDepartment(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<NoContentResult>(result); // Check if result is of type NoContentResult
            Assert.IsNotType<NotFoundResult>(result); // Check if result is not NotFoundResult
        }

        [Theory]
        [InlineData(28)]
        [InlineData(29)]
        [InlineData(35)]
        public async void DepartmentService_DeleteDepartment_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new DepartmentService(_db);

            // Act
            var result = await service.DeleteDepartment(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<NotFoundResult>(result); // Check if result is of type NotFoundObjectResult
        }
    }
}