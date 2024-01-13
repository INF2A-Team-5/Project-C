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
        [HttpGet("/GetMachinesPerAccount")] public async Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinePerAccountId(int accountId) => await _machineService.GetMachinePerAccountId(accountId);
        [HttpGet("/GetMachinesByArchived")] public async Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinesByArchived(bool archived, int AccountId) => await _machineService.GetMachinesByArchived(archived, AccountId);
        [HttpPut("/ArchiveByDepartment")] public async Task<IActionResult> ArchiveMachineByDepartmentId(int id) => await _machineService.ArchiveMachineByDepartmentId(id);
        [HttpPost] public async Task<ActionResult<Machine>> AddMachine(MachineDto newMachine) => await _machineService.AddMachine(newMachine);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteMachine(int id) => await _machineService.DeleteMachine(id);
    }
}