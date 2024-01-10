using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Backend.Dto;

namespace Backend.MachineService
{
    public interface IMachineService
    {
        Task<ActionResult<IEnumerable<Machine>>> GetAllMachines();
        Task<ActionResult<Machine>> GetMachineById(int id);
        Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinePerAccountId(int id);
        Task<ActionResult<Machine>> AddMachine(MachineModelToCustomerDto machine);
        Task<IActionResult> DeleteMachine(int id);
    }
}