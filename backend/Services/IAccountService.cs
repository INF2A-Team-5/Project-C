using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using backend.Dto;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.AccountService
{
    public interface IAccountService
    {
        Task<ActionResult<IEnumerable<Account>>> GetAccounts();
        Task<ActionResult<Account>> GetAccountById(int id);
        Task<ActionResult<Account>> AddAccount(Account newAccount);
        Task<IActionResult> UpdateAccount(int id, Account updatedAccount);
        Task<IActionResult> DeleteAccount(int id);
    }
}