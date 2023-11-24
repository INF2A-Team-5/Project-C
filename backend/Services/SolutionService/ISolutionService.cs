using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.SolutionService
{
    public interface ISolutionService
    {
        Task<ActionResult<IEnumerable<Solution>>> GetSolutions();
        Task<ActionResult<Solution>> GetSolutionById(int id);
        Task<IActionResult> UpdateSolution(int id, Solution solution);
        Task<ActionResult<Solution>> AddSolution(Solution solution);
        Task<IActionResult> DeleteSolution(int id);
    }
}