using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.CustomerService;

namespace Backend.Controllers
{
    // [Authorize]
    [Route("api/Customers")]
    [ApiController]
    public class CustomerController
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        [HttpGet("{id}")] public async Task<ActionResult<Customer>> GetCustomerByAccountId(int AccountId) => await _customerService.GetCustomerByAccountId(AccountId);
    }
}