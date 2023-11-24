using Microsoft.AspNetCore.Mvc;
using backend.Entities;
using Microsoft.AspNetCore.Authorization;
using backend.MachineService;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/Machines")]
    [ApiController]
    public class MachineController
    {
        private readonly IMachineService _machineService;

        public MachineController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        // GET: api/Machine
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachines()
        {
            return await _machineService.GetMachines();
        }

        // GET: api/Machine/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Machine>> GetMachineById(int id)
        {
            return await _machineService.GetMachineById(id);
        }
        
        [HttpGet("/GetMachinesPerAccount")]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachinePerAccountId(int accountId)
        {
            return await _machineService.GetMachinePerAccountId(accountId);
        }

        // PUT: api/Machine/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMachine(int id, Machine machine)
        {
            return await _machineService.UpdateMachine(id, machine);
        }

        // POST: api/Machine
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Machine>> AddMachine(Machine newMachine)
        {
            return await _machineService.AddMachine(newMachine);
        }
        
        // DELETE: api/Machine/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMachine(int id)
        {
            return await _machineService.DeleteMachine(id);
        }
    }
}