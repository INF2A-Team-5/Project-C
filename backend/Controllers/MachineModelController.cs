using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.MachineModelService;
using Backend.Dto;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/MachineModels")]
    [ApiController]
    public class MachineModelController
    {
        private readonly IMachineModelService _machineModelService;
        public MachineModelController(IMachineModelService machineModelService)
        {
            _machineModelService = machineModelService;
        }
        [HttpGet("/GetAllModels")] public async Task<ActionResult<IEnumerable<MachineModel>>> GetAllModels() => await _machineModelService.GetAllModels();
        [HttpGet] public async Task<ActionResult<IEnumerable<MachineModel>>> GetAllMachineModels(int AccountId, bool archived) => await _machineModelService.GetAllMachineModels(AccountId, archived);
        [HttpGet("/GetModelById")] public async Task<ActionResult<MachineModel>> GetMachineModelById(int id) => await _machineModelService.GetMachineModelById(id);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateMachineModel(int id, MachineModel model) => await _machineModelService.UpdateMachineModel(id, model);
        [HttpPost] public async Task<ActionResult<MachineModel>> AddMachine(MachineModelDto newMachine) => await _machineModelService.AddMachineModel(newMachine);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteMachine(int id) => await _machineModelService.DeleteMachineModel(id);
    }
}