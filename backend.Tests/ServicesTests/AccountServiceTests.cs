using Backend.AccountService;
using Xunit;
using FakeItEasy;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.ServicesTests
{
    public class AccountServiceTests
    {
        private readonly IAccountService _fakeAccountService;
        public AccountServiceTests()
        {
            _fakeAccountService = A.Fake<IAccountService>();
        }

        [Fact]
        public async void AccountService_GetAllAccounts_ReturnsAllAccounts()
        {
            // Arrange
            A.CallTo(() => _fakeAccountService.GetAllAccounts()).Returns(new List<Account>());
            // Act
            var result = await _fakeAccountService.GetAllAccounts();
            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Account>>(result.Value);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void AccountService_GetAccountById_ReturnsAccount(int id)
        {
            // Arrange
            A.CallTo(() => _fakeAccountService.GetAccountById(id)).Returns(new Account());
            // Act
            var result = await _fakeAccountService.GetAccountById(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<Account>(result.Value);
            Assert.IsNotType<NotFoundObjectResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void AccountService_GetAccountById_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeAccountService.GetAccountById(id)).Returns(new Account());
            // Act
            var result = await _fakeAccountService.GetAccountById(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Account>>(result);
            Assert.IsNotType<Account>(result.Value);
        }

        [Theory]
        [InlineData(1, "clientname" , "oldPw", AccountType.Client)]
        [InlineData(2, "empname" , "oldPw", AccountType.ServiceEmployee)]
        [InlineData(3, "adminname" , "oldPw", AccountType.Admin)]
        public async void AccountService_UpdateAccount_ReturnsNoContent(int id, string name, string password, AccountType accountType)
        {
            // Arrange
            var newPw = "newPw";
            var fakeAccount = new Account {AccountId = id, Name = name, Password = password, Class = accountType };
            var updatedAccount = new Account {AccountId = id, Name = name, Password = newPw, Class = accountType };
            A.CallTo(() => _fakeAccountService.UpdateAccount(id, fakeAccount)).Returns(new OkObjectResult(fakeAccount));
            // Act
            var result = await _fakeAccountService.UpdateAccount(id, updatedAccount);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<BadRequestResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1, "clientname" , "oldPw", AccountType.Client)]
        [InlineData(2, "empname" , "oldPw", AccountType.ServiceEmployee)]
        [InlineData(3, "adminname" , "oldPw", AccountType.Admin)]
        public async void AccountService_UpdateAccount_ReturnsBadRequest(int id, string name, string password, AccountType accountType)
        {
            // Arrange
            var wrongId = 4;
            var newPw = "newPw";
            var fakeAccount = new Account {AccountId = id, Name = name, Password = password, Class = accountType };
            var updatedAccount = new Account {AccountId = id, Name = name, Password = newPw, Class = accountType };
            A.CallTo(() => _fakeAccountService.UpdateAccount(id, fakeAccount)).Returns(new OkObjectResult(fakeAccount));
            // Act
            var result = await _fakeAccountService.UpdateAccount(wrongId, updatedAccount);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkResult>(result);
        }
        
        [Theory]
        [InlineData("testclient" , "testclientpw", AccountType.Client)]
        [InlineData("testemp" , "testemppw", AccountType.ServiceEmployee)]
        [InlineData("testadmin" , "testadminpw", AccountType.Admin)]
        public async void AccountService_AddAccount_ReturnsCreatedAtActionResult(string name, string password, AccountType accountType)
        {
            // Arrange
            var fakeAccount = new Account {Name = name, Password = password, Class = accountType };
            A.CallTo(() => _fakeAccountService.AddAccount(fakeAccount)).Returns(new Account());
            // Act
            var result = await _fakeAccountService.AddAccount(fakeAccount);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<Account>>(result);
            Assert.IsNotType<ObjectResult>(result);
        }
        
        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void AccountService_DeleteAccount_ReturnsNoContent(int id)
        {
            // Arrange
            A.CallTo(() => _fakeAccountService.DeleteAccount(id)).Returns(new OkObjectResult(id));
            // Act
            var result = await _fakeAccountService.DeleteAccount(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
            Assert.IsNotType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async void AccountService_DeleteAccount_ReturnsNotFound(int id)
        {
            // Arrange
            var wrongId = 4;
            A.CallTo(() => _fakeAccountService.DeleteAccount(id)).Returns(new OkObjectResult(id));
            // Act
            var result = await _fakeAccountService.DeleteAccount(wrongId);
            // Assert
            Assert.NotNull(result);
            Assert.IsNotType<OkObjectResult>(result);
        }
    }
}