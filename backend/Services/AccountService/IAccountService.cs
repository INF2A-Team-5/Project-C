using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.AccountService
{
    public interface IAccountService
    {
        Task<ActionResult<IEnumerable<Account>>> GetAllAccounts();
        Task<ActionResult<Account>> GetAccountById(int id);
        Task<ActionResult<Account>> AddAccount(Account newAccount);
        Task<IActionResult> UpdateAccount(int id, Account updatedAccount);
        Task<IActionResult> DeleteAccount(int id);
    }
}