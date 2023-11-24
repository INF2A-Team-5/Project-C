using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;

namespace Backend.MachineService
{
    public class MachinesService : ControllerBase, IMachineService
    {
        private readonly DataContext _context;

        public MachinesService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Machine>>> GetMachines()
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
            var machine = await _context.Machines.Where(machine => machine.AccountId == id).ToListAsync();

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

        public async Task<ActionResult<Machine>> AddMachine(Machine machine)
        {
            if (_context.Machines == null)
            {
                return Problem("Entity set 'DataContext.Machines'  is null.");
            }
            _context.Machines.Add(machine);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMachineById), new { id = machine.MachineId }, machine);
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
