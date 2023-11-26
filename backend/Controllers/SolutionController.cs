using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.SolutionService;

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
        [HttpGet] public async Task<ActionResult<IEnumerable<Solution>>> GetSolutions() => await _solutionService.GetSolutions();
        [HttpGet("{id}")] public async Task<ActionResult<Solution>> GetSolutionById(int id) => await _solutionService.GetSolutionById(id);
        [HttpPut("{id}")] public async Task<IActionResult> UpdateSolution(int id, Solution solution) => await _solutionService.UpdateSolution(id, solution);
        [HttpPost] public async Task<ActionResult<Solution>> AddSolution(Solution newSolution) => await _solutionService.AddSolution(newSolution);
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteSolution(int id) => await _solutionService.DeleteSolution(id);
    }
}