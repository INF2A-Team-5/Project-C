using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;

namespace Backend.CustomerService
{
    public class CustomerService : ControllerBase, ICustomerService
    {
        private readonly DataContext _context;

        public CustomerService(DataContext context)
        {
            _context = context;
        }
            public async Task<ActionResult<IEnumerable<Customer>>> GetAllCustomers()
            {
                if (_context.Customers == null)
                {
                    return NotFound();
                }
                return await _context.Customers.ToListAsync();
            }
        public async Task<ActionResult<Customer>> GetCustomerByAccountId(int AccountId)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.Where(customer => customer.AccountId == AccountId).FirstOrDefaultAsync();
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }
    }
}