using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;

namespace Backend.AccountService
{
    public class AccountService : ControllerBase, IAccountService
    {
        private readonly DataContext _context;

        public AccountService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            return await _context.Accounts.ToListAsync();
        }

        public async Task<ActionResult<Account>> GetAccountById(int id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return account;
        }

        public async Task<ActionResult<IEnumerable<Account>>> GetAccountsByArchived(bool archived)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var accounts = await _context.Accounts.Where(a => a.Archived == archived).ToListAsync();
            if (accounts == null)
            {
                return NotFound();
            }
            return accounts;
        }

        public async Task<IActionResult> UpdateAccount(int id, Account account)
        {
            if (id != account.AccountId)
            {
                return BadRequest();
            }
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'DataContext.Accounts'  is null.");
            }
            _context.Entry(account).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        public async Task<IActionResult> ArchiveAccountByDepartmentId(int DepartmentId)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            //var accounts = await _context.Accounts.Where(a => a.departmentId == DepartmentId).ToListAsync();

            var accounts = from employee in _context.Employees
                           where employee.DepartmentId == DepartmentId
                           join account in _context.Accounts
                           on employee.AccountId equals account.AccountId
                           select account;

            if (accounts == null)
            {
                return NotFound();
            }
            foreach (var account in accounts)
            {
                account.Archived = true;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public async Task<ActionResult<Account>> AddAccount(Account account)
        {
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'DataContext.Accounts'  is null.");
            }
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAccountById), new { id = account.AccountId }, account);
        }

        public async Task<IActionResult> DeleteAccount(int id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool AccountExists(int id) => (_context.Accounts?.Any(e => e.AccountId == id)).GetValueOrDefault();
    }
}