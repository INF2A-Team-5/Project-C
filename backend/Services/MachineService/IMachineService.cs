using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Backend.Dto;

namespace Backend.MachineService
{
    public interface IMachineService
    {
        Task<ActionResult<IEnumerable<Machine>>> GetAllMachines();
        Task<ActionResult<MachineInfoDto>> GetMachineById(int id);
        Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinePerAccountId(int id);
        Task<ActionResult<IEnumerable<MachineInfoDto>>> GetMachinesByArchived(bool archived, int AccountId);
        Task<IActionResult> ArchiveMachineByDepartmentId(int departmentId);
        Task<ActionResult<Machine>> AddMachine(MachineModelDto machine, int Customer_Id);
        Task<IActionResult> DeleteMachine(int id);
    }
}