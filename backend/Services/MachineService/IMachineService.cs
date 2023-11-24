using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.MachineService
{
    public interface IMachineService
    {
        Task<ActionResult<IEnumerable<Machine>>> GetMachines();
        Task<ActionResult<Machine>> GetMachineById(int id);
        Task<IActionResult> UpdateMachine(int id, Machine machine);
        Task<ActionResult<Machine>> AddMachine(Machine machine);
        Task<IActionResult> DeleteMachine(int id);
    }
}