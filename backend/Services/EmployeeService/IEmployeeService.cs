using Backend.Dto;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.EmployeeService
{
    public interface IEmployeeService
    {
        Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees();
        Task<ActionResult<Employee>> GetEmployeeById(int id);
        Task<ActionResult<Employee>> AddEmployee(AddEmployeeDto newEmployee);
    }
}