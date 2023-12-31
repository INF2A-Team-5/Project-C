using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.MachineService;
using Backend.Dto;

namespace Backend.Controllers
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
        [HttpGet] public async Task<ActionResult<IEnumerable<Machine>>> GetAllMachines() => await _machineService.GetAllMachines();
        [HttpGet("{id}")] public async Task<ActionResult<Machine>> GetMachineById(int id) => await _machineService.GetMachineById(id);
        [HttpGet("/GetMachinesPerAccount")] public async Task<ActionResult<IEnumerable<Machine>>> GetMachinePerAccountId(int accountId) => await _machineService.GetMachinePerAccountId(accountId);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateMachine(int id, Machine machine) => await _machineService.UpdateMachine(id, machine);
        [HttpPost] public async Task<ActionResult<Machine>> AddMachine(MachineDto newMachine) => await _machineService.AddMachine(newMachine);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteMachine(int id) => await _machineService.DeleteMachine(id);
    }
}