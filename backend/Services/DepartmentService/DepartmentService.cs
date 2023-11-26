using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;

namespace Backend.DepartmentService
{
    public class DepartmentService : ControllerBase, IDepartmentService
    {
        private readonly DataContext _context;

        public DepartmentService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Department>>> GetAllDepartments()
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            return await _context.Departments.ToListAsync();
        }

        public async Task<ActionResult<Department>> GetDepartmentById(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            return department;
        }

        public async Task<IActionResult> UpdateDepartment(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }
            _context.Entry(department).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        public async Task<ActionResult<Department>> AddDepartment(Department department)
        {
            if (_context.Departments == null)
            {
                return Problem("Entity set 'DataContext.Departments'  is null.");
            }
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDepartmentById), new { id = department.DepartmentId }, department);
        }

        public async Task<IActionResult> DeleteDepartment(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool DepartmentExists(int id)
        {
            return (_context.Departments?.Any(e => e.DepartmentId == id)).GetValueOrDefault();
        }
    }
}
