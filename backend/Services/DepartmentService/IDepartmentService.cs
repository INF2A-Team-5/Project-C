using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.DepartmentService
{
    public interface IDepartmentService
    {
        Task<ActionResult<IEnumerable<Department>>> GetDepartments();
        Task<ActionResult<Department>> GetDepartmentById(int id);
        Task<IActionResult> UpdateDepartment(int id, Department department);
        Task<ActionResult<Department>> AddDepartment(Department department);
        Task<IActionResult> DeleteDepartment(int id);

    }
}