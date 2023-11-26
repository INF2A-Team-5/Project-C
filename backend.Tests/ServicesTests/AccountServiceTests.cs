using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.AccountService;
using Xunit;
using FakeItEasy;
using Backend.Data;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
namespace backend.Tests.ServicesTests
{
    public class AccountServiceTests
    {
        [Fact]
        public async void AccountService_GetAllAccounts_ReturnsAllAccounts()
        {
            // Arrange
            var fakeAccountService = A.Fake<IAccountService>();
            A.CallTo(() => fakeAccountService.GetAllAccounts()).Returns(new List<Account>());
            // Act
            var result = await fakeAccountService.GetAllAccounts();
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
            var fakeAccountService = A.Fake<IAccountService>();
            A.CallTo(() => fakeAccountService.GetAccountById(id)).Returns(new Account());
            // Act
            var result = await fakeAccountService.GetAccountById(id);
            // Assert
            Assert.NotNull(result);
            Assert.IsType<Account>(result.Value);
        }

        [Theory]
        [InlineData(1, "clientname" , "newPw", AccountType.Client)]
        [InlineData(2, "empname" , "newPw", AccountType.ServiceEmployee)]
        [InlineData(3, "adminname" , "newPw", AccountType.Admin)]
        public async void AccountService_UpdateAccount_ReturnsIActionResult(int id, string name, string password, AccountType accountType)
        {
            // Arrange
            var fakeAccountService = A.Fake<IAccountService>();
            var newPw = "newPw";
            var updatedAcc = new Account {AccountId = id, Name = name, Password = password, Class = accountType };
            A.CallTo(() => fakeAccountService.UpdateAccount(id, updatedAcc)).Returns(new OkObjectResult(updatedAcc));
            // Act
            var result = await fakeAccountService.UpdateAccount(id, new Account { Name = name, Password = newPw, Class = accountType });
            // Assert
            Assert.NotNull(result);
            Assert.Equal(updatedAcc.Password, newPw);
        }
        
        [Theory]
        [InlineData("testclient" , "testclientpw", AccountType.Client)]
        [InlineData("testemp" , "testemppw", AccountType.ServiceEmployee)]
        [InlineData("testadmin" , "testadminpw", AccountType.Admin)]
        public async void AccountService_AddAccount_ReturnsIActionResult(string name, string password, AccountType accountType)
        {
            // Arrange
            var fakeAccountService = A.Fake<IAccountService>();
            var newAccount = new Account {Name = name, Password = password, Class = accountType };
            A.CallTo(() => fakeAccountService.AddAccount(newAccount)).Returns(new Account());
            // Act
            var result = await fakeAccountService.AddAccount(new Account { Name = name, Password = password, Class = accountType });
            // Assert
            Assert.NotNull(result);
            Assert.IsType<NoContentResult>(result);
        }
        
    }
}