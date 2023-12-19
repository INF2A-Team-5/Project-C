using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;
using Backend.Dto;

namespace Backend.MachineService
{
    public class MachinesService : ControllerBase, IMachineService
    {
        private readonly DataContext _context;

        public MachinesService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Machine>>> GetAllMachines()
        {
            if (_context.Machines == null)
            {
                return NotFound();
            }
            return await _context.Machines.ToListAsync();
        }

        public async Task<ActionResult<Machine>> GetMachineById(int id)
        {
            if (_context.Machines == null)
            {
                return NotFound("No machines in db");
            }
            var machine = await _context.Machines.Where(machine => machine.MachineId == id).FirstOrDefaultAsync();
            if (machine == null)
            {
                return NotFound("No machines under this ID");
            }
            return machine;
        }

        public async Task<ActionResult<IEnumerable<Machine>>> GetMachinePerAccountId(int id)
        {
            if (_context.Machines == null)
            {
                return NotFound("No machines in db");
            }
            var machine = await _context.Machines.Where(machine => machine.CustomerId == id).ToListAsync();

            if (machine == null)
            {
                return NotFound("No machines under this ID");
            }
            return machine;
        }

        public async Task<IActionResult> UpdateMachine(int id, Machine machine)
        {
            if (id != machine.MachineId)
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

        public async Task<ActionResult<Machine>> AddMachine(MachineDto machine)
        {
            if (_context.Machines == null)
            {
                return Problem("Entity set 'DataContext.Machines'  is null.");
            }
            var department = await (from departments in _context.Departments where departments.DepartmentId == machine.DepartmentId select departments).FirstOrDefaultAsync();
            Machine newMachine = new() { Department = department, Description = machine.Description, Name = machine.Name };
            _context.Machines.Add(newMachine);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMachineById), new { id = newMachine.MachineId }, newMachine);
        }

        public async Task<IActionResult> DeleteMachine(int id)
        {
            if (_context.Machines == null)
            {
                return NotFound();
            }
            var machine = await _context.Machines.FindAsync(id);
            if (machine == null)
            {
                return NotFound();
            }
            _context.Machines.Remove(machine);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool MachineExists(int id) => (_context.Machines?.Any(e => e.MachineId == id)).GetValueOrDefault();
    }
}
