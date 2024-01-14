using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.CustomerService
{
    public interface ICustomerService
    {
        // Task<ActionResult<IEnumerable<Customer>>> GetAllCustomers();
        Task<ActionResult<Customer>> GetCustomerByAccountId(int AccountId);
    }
}