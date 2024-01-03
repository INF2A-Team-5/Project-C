using Backend.AccountService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.ServicesTests
{
    public class AccountServiceTests
    {
        private readonly DataContext _db = new();
        public AccountServiceTests() { }

        [Fact]
        public async void AccountService_GetAllAccounts_ReturnsAllAccounts()
        {
            // Arrange
            var service = new AccountService(_db);

            // Act
            var result = await service.GetAllAccounts();

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<IEnumerable<Account>>>(result); // Check if result is of type ActionResult<IEnumerable<Account>>
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void AccountService_GetAccountById_ReturnsAccount(int id)
        {
            // Arrange
            var service = new AccountService(_db);

            // Act
            var result = await service.GetAccountById(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Account>>(result); // Check if result is of type ActionResult<Account>
            Assert.IsNotType<NotFoundObjectResult>(result); // Check if result is not NotFoundObjectResult
        }

        [Theory]
        [InlineData(10)]
        [InlineData(11)]
        [InlineData(12)]
        public async void AccountService_GetAccountById_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new AccountService(_db);

            // Act
            var result = await service.GetAccountById(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Account>>(result); // Check if result is of type ActionResult<Account>
            Assert.IsNotType<NotFoundObjectResult>(result.Result);  // Check if result is not NotFoundObjectResult
        }

        [Theory]
        [InlineData(1, "clientname", AccountType.Client)]
        [InlineData(2, "empname", AccountType.ServiceEmployee)]
        [InlineData(3, "adminname", AccountType.Admin)]
        public async void AccountService_UpdateAccount_ReturnsNoContent(int id, string name, AccountType accountType)
        {
            // Arrange
            var service = new AccountService(_db);

            string newPw = "newPw";
            Account updatedAccount = new() { AccountId = id, Name = name, Password = newPw, Class = accountType };

            // Act
            var result = await service.UpdateAccount(id, updatedAccount);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsNotType<BadRequestResult>(result); // Check if result is not BadRequestResult
            Assert.IsNotType<NotFoundResult>(result); // Check if result is not NotFoundResult
        }

        [Theory]
        [InlineData(12, 1, "clientname", AccountType.Client)]
        [InlineData(13, 2, "empname", AccountType.ServiceEmployee)]
        [InlineData(14, 3, "adminname", AccountType.Admin)]
        public async void AccountService_UpdateAccount_ReturnsBadRequest(int wrongId, int id, string name, AccountType accountType)
        {
            // Arrange
            var service = new AccountService(_db);
            string newPw = "newPw";
            Account updatedAccount = new() { AccountId = id, Name = name, Password = newPw, Class = accountType };

            // Act
            var result = await service.UpdateAccount(wrongId, updatedAccount);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsNotType<OkResult>(result); // Check if result is not OkResult
        }

        [Theory]
        [InlineData("testclient", "testclientpw", AccountType.Client)]
        [InlineData("testemp", "testemppw", AccountType.ServiceEmployee)]
        [InlineData("testadmin", "testadminpw", AccountType.Admin)]
        public async void AccountService_AddAccount_ReturnsCreatedAtActionResult(string name, string password, AccountType accountType)
        {
            // Arrange
            var service = new AccountService(_db);
            Account newAccount = new() { Name = name, Password = password, Class = accountType };

            // Act
            var result = await service.AddAccount(newAccount);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<ActionResult<Account>>(result); // Check if result is of type ActionResult<Account>
            Assert.IsNotType<ObjectResult>(result); // Check if result is not ObjectResult
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        // ------------------------------------------------
        // Does not work!!! Has beef with Employees table
        // ------------------------------------------------
        public async void AccountService_DeleteAccount_ReturnsNoContent(int id)
        {
            // Arrange
            var service = new AccountService(_db);

            // Act
            var result = await service.DeleteAccount(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsType<OkObjectResult>(result); // Check if result is of type OkObjectResult 
            Assert.IsNotType<NotFoundResult>(result); // Check if result is not NotFoundResult
        }

        [Theory]
        [InlineData(23)]
        [InlineData(87)]
        [InlineData(11)]
        public async void AccountService_DeleteAccount_ReturnsNotFound(int id)
        {
            // Arrange
            var service = new AccountService(_db);

            // Act
            var result = await service.DeleteAccount(id);

            // Assert
            Assert.NotNull(result); // Check if result is not null
            Assert.IsNotType<OkObjectResult>(result); // Check if result is not OkObjectResult
        }
    }
}