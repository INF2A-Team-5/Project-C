using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.SolutionService;
using Backend.Dto;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/Solutions")]
    [ApiController]
    public class SolutionController
    {
        private readonly ISolutionService _solutionService;
        public SolutionController(ISolutionService solutionService)
        {
            _solutionService = solutionService;
        }
        [HttpGet] public async Task<ActionResult<IEnumerable<Solution>>> GetAllSolutions() => await _solutionService.GetAllSolutions();
        [HttpGet("{id}")] public async Task<ActionResult<Solution>> GetSolutionById(int id) => await _solutionService.GetSolutionById(id);
        [HttpGet("/GetsolutionsPerMachine")] public async Task<ActionResult<IEnumerable<Solution>>> GetSolutionsBymodelId(int id) => await _solutionService.GetSolutionsBymodelId(id);
        [HttpGet("Archived/{archived}")] public async Task<ActionResult<IEnumerable<Solution>>> GetSolutionsByArchived(bool archived) => await _solutionService.GetSolutionsByArchived(archived);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateSolution(int id, SolutionDto solution) => await _solutionService.UpdateSolution(id, solution);
        [HttpPut("ArchiveByTicket/{id}")] public async Task<IActionResult> ArchiveSolutionByTicketId(int id) => await _solutionService.ArchiveSolutionByTicketId(id);
        [HttpPost] public async Task<ActionResult<Solution>> AddSolution(SolutionDto newSolution) => await _solutionService.AddSolution(newSolution);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteSolution(int id) => await _solutionService.DeleteSolution(id);
    }
}