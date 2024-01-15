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

        public async Task<ActionResult<MachineInfoDto>> GetMachineById(int id)
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
            var model = await _context.Models.Where(model => model.ModelId == machine.ModelId).FirstOrDefaultAsync();
            MachineInfoDto machine_info = new() { MachineId = machine.MachineId, ModelId = machine.ModelId, DepartmentId = model.DepartmentId, Description = model.Description, Name = model.Name, Customer_Id = (int)machine.Customer_Id!};
            return machine_info;
        }

        public async Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinePerAccountId(int AccountId)
        {
            if (_context.Machines == null || _context.Models == null || _context.Accounts == null || _context.Customers == null)
            {
                return NotFound("Insufficient data in db");
            }
            var customer = await _context.Customers.Where(cust => cust.AccountId == AccountId).FirstOrDefaultAsync();
            if (customer == null)
            {
                return NotFound();
            }
            List<MachineInfoDto> details = new();
            var machines = await _context.Machines.Where(machine => machine.Customer_Id == customer.CustomerId).ToListAsync();
            foreach (var machine in machines)
            {
                var model = _context.Models.Where(x => x.ModelId == machine.ModelId).FirstOrDefault();
                if (model == null)
                {
                    return NotFound("No model found");
                }
                details.Add(new MachineInfoDto() { Customer_Id = customer.CustomerId, DepartmentId = model.DepartmentId, Description = model.Description, MachineId = machine.MachineId, ModelId = machine.ModelId, Name = model.Name });
            }
            if (machines == null)
            {
                return NotFound("No machines under this ID");
            }
            return details;
        }
        public async Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinesByArchived(bool archived, int AccountId)
        {
            if (_context.Machines == null || _context.Models == null || _context.Accounts == null || _context.Customers == null)
            {
                return NotFound("Insufficient data in db");
            }
            var customer = await _context.Customers.Where(cust => cust.AccountId == AccountId).FirstOrDefaultAsync();
            if (customer == null)
            {
                return NotFound();
            }
            List<MachineInfoDto> details = new();
            var machines = await _context.Machines.Where(machine => machine.Customer_Id == customer.CustomerId && machine.Archived == archived).ToListAsync();
            foreach (var machine in machines)
            {
                var model = _context.Models.Where(x => x.ModelId == machine.ModelId).FirstOrDefault();
                if (model == null)
                {
                    return NotFound("No model found");
                }
                details.Add(new MachineInfoDto() { Customer_Id = customer.CustomerId, DepartmentId = model.DepartmentId, Description = model.Description, MachineId = machine.MachineId, ModelId = machine.ModelId, Name = model.Name });
            }
            if (machines == null)
            {
                return NotFound("No machines under this ID");
            }
            return details;
        }

        public async Task<IActionResult> ArchiveMachineByDepartmentId(int id)
        {
            if (_context.Machines == null)
            {
                return NotFound();
            }
            var machines = await _context.Models.Where(m => m.DepartmentId == id).ToListAsync();
            if (machines == null)
            {
                return NotFound();
            }
            foreach (var machine in machines)
            {
                machine.Archived = true;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public async Task<ActionResult<Machine>> AddMachine(MachineModelDto machine, int Customer_Id)
        {
            if (_context.Models == null || _context.Customers == null)
            {
                return Problem("Entity set is null.");
            }
            Machine new_machine = new() { Customer_Id = Customer_Id, ModelId = machine.ModelId, Archived = false };
            var customer = await _context.Customers.Where(cus => cus.CustomerId == Customer_Id).FirstOrDefaultAsync();
            if (customer == null)
            {
                return NotFound();
            }
            customer.Machines.Add(new_machine);
            await _context.SaveChangesAsync();
            return NoContent();
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
