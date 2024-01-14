using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;
using Backend.Dto;
using Backend.MachineService;

namespace Backend.MachineModelService
{
    public class MachineModelService : ControllerBase, IMachineModelService
    {
        private readonly DataContext _context;

        public MachineModelService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<MachineModel>>> GetAllModels()
        {
            if (_context.Models == null)
            {
                return NotFound();
            }
            var models = await _context.Models.Where(mach => mach.Archived == false).ToListAsync();
            if (models == null)
            {
                return NotFound();
            }
            return models;
        }
        public async Task<ActionResult<IEnumerable<MachineModel>>> GetAllMachineModels(int AccountId, bool archived)
        {
            if (_context.Accounts == null || _context.Tickets == null || _context.Customers == null | _context.Employees == null || _context.Departments == null)
            {
                return NotFound();
            }
            var account = await (from accs in _context.Accounts where accs.AccountId == AccountId select accs).FirstOrDefaultAsync();
            if (account == null)
            {
                return NotFound();
            }
            switch (account.Class)
            {
                case AccountType.ServiceEmployee:
                    var employee = await (from accs in _context.Employees where accs.AccountId == account.AccountId select accs).FirstOrDefaultAsync();
                    int departmentId = await (from employees in _context.Employees where employees.AccountId == AccountId select employees.DepartmentId).FirstOrDefaultAsync();
                    if (employee == null)
                    {
                        return NotFound();
                    }
                    var depMachines = await (from model in _context.Models where model.DepartmentId == departmentId && model.Archived == archived select model).ToListAsync();
                    if (depMachines == null || depMachines.Count == 0)
                    {
                        return NotFound("No tickets under this department");
                    }
                    return depMachines;
                case AccountType.Client:
                    {
                        return NotFound("Wrong account");
                    }
                case AccountType.Admin:
                    var models = await (from model in _context.Models where model.Archived == archived select model).ToListAsync();
                    if (models == null)
                    {
                        return NotFound();
                    }
                    return models;
            }
            return NotFound();
        }

            public async Task<ActionResult<MachineModel>> GetMachineModelById(int id)
            {
                if (_context.Models == null)
                {
                    return NotFound("No machines in db");
                }
                var machine = await _context.Models.Where(machine => machine.ModelId == id).FirstOrDefaultAsync();
                if (machine == null)
                {
                    return NotFound("No machines under this ID");
                }
                return machine;
            }


            public async Task<IActionResult> UpdateMachineModel(int id, MachineModel machine)
            {
                if (id != machine.ModelId)
                {
                    return BadRequest();
                }
                _context.Entry(machine).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MachineExists(id))
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

            public async Task<ActionResult<MachineModel>> AddMachineModel(MachineModelDto machine)
            {
                if (_context.Models == null)
                {
                    return Problem("Entity set 'DataContext.Machines'  is null.");
                }
                var department = await (from departments in _context.Departments where departments.DepartmentId == machine.DepartmentId select departments).FirstOrDefaultAsync();
                if (department == null)
                {
                    return Problem("Department is null");
                }
                MachineModel newMachine = new() { Department = department, Description = machine.Description, Name = machine.Name };
                _context.Models.Add(newMachine);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetMachineModelById), new { id = newMachine.ModelId }, newMachine);
            }

            public async Task<IActionResult> DeleteMachineModel(int id)
            {
                if (_context.Models == null)
                {
                    return NotFound();
                }
                var machine = await _context.Models.FindAsync(id);
                if (machine == null)
                {
                    return NotFound();
                }
                _context.Models.Remove(machine);
                await _context.SaveChangesAsync();
                return NoContent();
            }

            private bool MachineExists(int id) => (_context.Models?.Any(e => e.ModelId == id)).GetValueOrDefault();
        }
    }
