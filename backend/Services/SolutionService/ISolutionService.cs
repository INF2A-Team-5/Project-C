using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.SolutionService
{
    public interface ISolutionService
    {
        Task<ActionResult<IEnumerable<Solution>>> GetAllSolutions();
        Task<ActionResult<Solution>> GetSolutionById(int id);
        Task<IActionResult> UpdateSolution(int id, Solution solution);
        Task<ActionResult<Solution>> AddSolution(Solution solution);
        Task<IActionResult> DeleteSolution(int id);
    }
}