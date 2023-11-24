using Microsoft.AspNetCore.Mvc;
using backend.Entities;
using Microsoft.AspNetCore.Authorization;
using backend.SolutionService;

namespace backend.Controllers
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

        // GET: api/Solution
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solution>>> GetSolutions()
        {
            return await _solutionService.GetSolutions();
        }

        // GET: api/Solution/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solution>> GetSolutionById(int id)
        {
            return await _solutionService.GetSolutionById(id);
        }

        // PUT: api/Solution/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSolution(int id, Solution solution)
        {
            return await _solutionService.UpdateSolution(id, solution);
        }

        // POST: api/Solution
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Solution>> AddSolution(Solution newSolution)
        {
            return await _solutionService.AddSolution(newSolution);
        }

        // DELETE: api/Solution/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolution(int id)
        {
            return await _solutionService.DeleteSolution(id);
        }
    }
}