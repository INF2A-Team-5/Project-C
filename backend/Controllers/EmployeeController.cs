using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.EmployeeService;
using Backend.Dto;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/Employees")]
    [ApiController]
    public class EmployeeController
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        [HttpGet] public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees() => await _employeeService.GetAllEmployees();
        [HttpGet("{id}")] public async Task<ActionResult<Employee>> GetEmployeeById(int id) => await _employeeService.GetEmployeeById(id);
        [HttpPost] public async Task<ActionResult<Employee>> AddEmployee(AddEmployeeDto newEmployee) => await _employeeService.AddEmployee(newEmployee);   
    }
}