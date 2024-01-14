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
        Task<ActionResult<IEnumerable<Machine>>> GetMachinesByArchived(bool archived);
        Task<IActionResult> UpdateMachine(int id, Machine machine);
        Task<IActionResult> ArchiveMachineByDepartmentId(int departmentId);
        Task<ActionResult<Machine>> AddMachine(MachineDto machine);
        Task<IActionResult> DeleteMachine(int id);
    }
}