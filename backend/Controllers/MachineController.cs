using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/Machines")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly DataContext _context;

        public MachinesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Machine
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachines()
        {
          if (_context.Machines == null)
          {
              return NotFound();
          }
            return await _context.Machines.ToListAsync();
        }

        // GET: api/Machine/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachine(int id)
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

        // PUT: api/Machine/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMachine(int id, Machine machine)
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

        // POST: api/Machine
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Machine>> PostMachine(Machine machine)
        {
          if (_context.Machines == null)
          {
              return Problem("Entity set 'DataContext.Machines'  is null.");
          }
            _context.Machines.Add(machine);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetMachine", new { id = Machine.MachineId }, Machine);
            return CreatedAtAction(nameof(GetMachine), new { id = machine.MachineId }, machine);
        }

        // DELETE: api/Machine/5
        [HttpDelete("{id}")]
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

        private bool MachineExists(int id)
        {
            return (_context.Machines?.Any(e => e.MachineId == id)).GetValueOrDefault();
        }
    }
}
