using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.AccountService;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/Accounts")]
    [ApiController]
    public class AccountController
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpGet] public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts() => await _accountService.GetAllAccounts();
        [HttpGet("{id}")] public async Task<ActionResult<Account>> GetAccountById(int id) => await _accountService.GetAccountById(id);
        [HttpGet("Archived/{archived}")] public async Task<ActionResult<IEnumerable<Account>>> GetAccountsByArchived(bool archived) => await _accountService.GetAccountsByArchived(archived);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateAccount(int id, Account account) => await _accountService.UpdateAccount(id, account);
        [HttpPut("ArchiveByDepartment/{id}")] public async Task<IActionResult> ArchiveAccountByDepartmentId(int id) => await _accountService.ArchiveAccountByDepartmentId(id);
        [HttpPost] public async Task<ActionResult<Account>> AddAccount(Account newAccount) => await _accountService.AddAccount(newAccount);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteAccount(int id) => await _accountService.DeleteAccount(id);
    }
}