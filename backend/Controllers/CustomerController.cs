using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.CustomerService;
using Backend.Dto;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/Customers")]
    [ApiController]
    public class CustomerController
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        [HttpGet] public async Task<ActionResult<IEnumerable<CustomerInfoDto>>> GetAllCustomers() => await _customerService.GetAllCustomers();
        [HttpGet("getCustomer")] public async Task<ActionResult<CustomerInfoDto>> GetCustomerByAccountId(int AccountId) => await _customerService.GetCustomerByAccountId(AccountId);
    }
}