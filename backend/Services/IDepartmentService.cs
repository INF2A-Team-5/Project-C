using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.DepartmentService
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