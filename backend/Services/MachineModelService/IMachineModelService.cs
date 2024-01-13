using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Backend.Dto;

namespace Backend.MachineModelService
{
    public interface IMachineModelService
    {
        Task<ActionResult<IEnumerable<MachineModel>>> GetAllMachineModels(int AccountId, bool archived);
        Task<ActionResult<MachineModel>> GetMachineModelById(int id);
        Task<IActionResult> UpdateMachineModel(int id, MachineModel machine);
        Task<ActionResult<MachineModel>> AddMachineModel(MachineModelDto machine);
        Task<IActionResult> DeleteMachineModel(int id);
    }
}