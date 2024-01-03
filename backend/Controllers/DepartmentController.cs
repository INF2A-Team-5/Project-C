using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.DepartmentService;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/Departments")]
    [ApiController]
    public class DepartmentController
    {
        private readonly IDepartmentService _departmentService;
        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }
        [HttpGet] public async Task<ActionResult<IEnumerable<Department>>> GetAllDepartments() => await _departmentService.GetAllDepartments();
        [HttpGet("{id}")] public async Task<ActionResult<Department>> GetDepartmentById(int id) => await _departmentService.GetDepartmentById(id);
        [HttpGet("Archived/{archived}")] public async Task<ActionResult<IEnumerable<Department>>> GetDepartmentsByArchived(bool archived) => await _departmentService.GetDepartmentsByArchived(archived);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateDepartment(int id, Department department) => await _departmentService.UpdateDepartment(id, department);
        [HttpPost] public async Task<ActionResult<Department>> AddDepartment(Department newDepartment) => await _departmentService.AddDepartment(newDepartment);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteDepartment(int id) => await _departmentService.DeleteDepartment(id);
    }
}
