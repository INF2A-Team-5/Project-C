using Backend.Dto;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.EmployeeService
{
    public interface IEmployeeService
    {
        Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees();
        Task<ActionResult<Employee>> GetEmployeeByAccountId(int id);
        Task<ActionResult<Employee>> AddEmployee(AddEmployeeDto newEmployee);
        Task<ActionResult<IEnumerable<Employee>>> GetEmployeesByDepartmentId(int DepartmentId);
    }
}