using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;
using Backend.Dto;

namespace Backend.CustomerService
{
    public class CustomerService : ControllerBase, ICustomerService
    {
        private readonly DataContext _context;

        public CustomerService(DataContext context)
        {
            _context = context;
        }
            public async Task<ActionResult<IEnumerable<CustomerInfoDto>>> GetAllCustomers()
            {
                if (_context.Customers == null)
                {
                    return NotFound();
                }
                List<CustomerInfoDto> details = new();
                var customers = await _context.Customers.ToListAsync();
                foreach (var cus in customers)
                {
                    var name = await (from acc in _context.Accounts where acc.AccountId == cus.AccountId select acc.Name).FirstOrDefaultAsync();
                    if (name == null)
                    {
                        return NotFound();
                    }
                    details.Add( new CustomerInfoDto() { AccountId = cus.AccountId, CustomerId = cus.CustomerId, Name = name});
                }
                return details;
            }
        public async Task<ActionResult<CustomerInfoDto>> GetCustomerByAccountId(int AccountId)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.Where(customer => customer.AccountId == AccountId).FirstOrDefaultAsync();
            var name = (from acc in _context.Accounts where acc.AccountId == AccountId select acc.Name).FirstOrDefaultAsync().ToString();
            if (customer == null || name == null)
            {
                return NotFound();
            }
            CustomerInfoDto cust = new() { AccountId = customer.AccountId, CustomerId = customer.CustomerId, Name = name };
            return cust;
        }
    }
}