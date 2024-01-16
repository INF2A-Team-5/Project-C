using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;
using Backend.Dto;

namespace Backend.EmployeeService
{
    public class EmployeeService : ControllerBase, IEmployeeService
    {
        private readonly DataContext _context;
        public EmployeeService(DataContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            return await _context.Employees.ToListAsync();
        }
        public async Task<ActionResult<Employee>> GetEmployeeByAccountId(int id)
        {
            if (_context.Accounts == null || _context.Employees == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            var employee = await (from employees in _context.Employees where employees.AccountId == account.AccountId select employees).FirstOrDefaultAsync();
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }
        public async Task<ActionResult<Employee>> AddEmployee(AddEmployeeDto newEmployee)
        {
            if (_context.Accounts == null || _context.Employees == null)
            {
                return NotFound();
            }
            var department = await (from departments in _context.Departments where departments.DepartmentId == newEmployee.DepartmentId select departments).FirstOrDefaultAsync();
            var account = await (from accounts in _context.Accounts where accounts.AccountId == newEmployee.AccountId select accounts).FirstOrDefaultAsync();
            if (department == null || account == null)
            {
                return NotFound();
            }
            Employee emp = new() { Department = department, Account = account };

            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployeeByAccountId), new { id = emp.EmployeeId }, emp);
        }
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployeesByDepartmentId(int DepartmentId)
        {
            if (_context.Employees == null || _context.Departments == null)
            {
                return NotFound();
            }
            List<EmployeeDto> employeeswithname = new();
            var employees = await _context.Employees.Where(emp => emp.DepartmentId == DepartmentId).ToListAsync();
            if (employees == null || employees.Count == 0)
            {
                return NotFound();
            }
            foreach (var employee in employees)
            {
                var name = await (from accounts in _context.Accounts where accounts.AccountId == employee.AccountId select accounts.Name).FirstOrDefaultAsync();
                if (name == null)
                {
                    return NotFound();
                }
                var emp = new EmployeeDto()
                {
                    EmployeeId = employee.EmployeeId,
                    Name = name,
                    AccountId = employee.AccountId,
                    DepartmentId = employee.DepartmentId
                };
                employeeswithname.Add(emp);
            }
            if (employeeswithname == null)
            {
                return NotFound();
            }
            return employeeswithname;
        }
    }
}