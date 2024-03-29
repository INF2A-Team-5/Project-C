using Backend.Dto;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.SolutionService
{
        public interface ISolutionService
        {
                Task<ActionResult<IEnumerable<Solution>>> GetAllSolutions();
                Task<ActionResult<Solution>> GetSolutionById(int id);
                Task<ActionResult<IEnumerable<Solution>>> GetSolutionsBymodelId(int id);
                Task<ActionResult<IEnumerable<Solution>>> GetSolutionsByArchived(bool archived);
                Task<IActionResult> UpdateSolution(int id, SolutionDto solution);
                Task<IActionResult> ArchiveSolutionByTicketId(int ticketId);
                Task<ActionResult<Solution>> AddSolution(SolutionDto solution);
                Task<IActionResult> DeleteSolution(int id);
        }
}