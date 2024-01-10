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

        public async Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinePerAccountId(int id)
        {
            if (_context.Machines == null || _context.Models == null || _context.Accounts == null || _context.Customers == null)
            {
                return NotFound("Insufficient data in db");
            }
            List<MachineInfoDto> details = new();
            var machines = await _context.Machines.Where(machine => machine.Customer_Id == id).ToListAsync();
            foreach (var machine in machines)
            {
                var model = _context.Models.Where(x => x.ModelId == machine.ModelId).FirstOrDefault();
                if (model == null)
                {
                    return NotFound("No model found");
                }
                details.Add(new MachineInfoDto() { Customer_Id = id, DepartmentId = model.DepartmentId, Description = model.Description, MachineId = machine.MachineId, ModelId = machine.ModelId, Name = model.Name });
            }
            if (machines == null)
            {
                return NotFound("No machines under this ID");
            }
            return details;
        }

        public async Task<ActionResult<Machine>> AddMachine(MachineModelToCustomerDto machine)
        {
            if (_context.Models == null)
            {
                return Problem("Entity set 'DataContext.Machines'  is null.");
            }

            return Ok();
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
