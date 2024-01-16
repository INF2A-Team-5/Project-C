using Backend.Dto;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.CustomerService
{
    public interface ICustomerService
    {
        Task<ActionResult<CustomerInfoDto>> GetCustomerByAccountId(int AccountId);
        Task<ActionResult<IEnumerable<CustomerInfoDto>>> GetAllCustomers();
    }
}