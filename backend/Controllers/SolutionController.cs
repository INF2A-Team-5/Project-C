using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/Solutions")]
    [ApiController]
    public class SolutionsController : ControllerBase
    {
        private readonly DataContext _context;

        public SolutionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Solution
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solution>>> GetSolutions()
        {
          if (_context.Solutions == null)
          {
              return NotFound();
          }
            return await _context.Solutions.ToListAsync();
        }

        // GET: api/Solution/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solution>> GetSolution(int id)
        {
          if (_context.Solutions == null)
          {
              return NotFound();
          }
            var solution = await _context.Solutions.FindAsync(id);

            if (solution == null)
            {
                return NotFound();
            }

            return solution;
        }

        // PUT: api/Solution/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolution(int id, Solution solution)
        {
            if (id != solution.SolutionId)
            {
                return BadRequest();
            }

            _context.Entry(solution).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolutionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Solution
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Solution>> PostSolution(Solution solution)
        {
          if (_context.Solutions == null)
          {
              return Problem("Entity set 'DataContext.Solutions'  is null.");
          }
            _context.Solutions.Add(solution);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetSolution", new { id = Solution.SolutionId }, Solution);
            return CreatedAtAction(nameof(GetSolution), new { id = solution.SolutionId }, solution);
        }

        // DELETE: api/Solution/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolution(int id)
        {
            if (_context.Solutions == null)
            {
                return NotFound();
            }
            var solution = await _context.Solutions.FindAsync(id);
            if (solution == null)
            {
                return NotFound();
            }

            _context.Solutions.Remove(solution);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SolutionExists(int id)
        {
            return (_context.Solutions?.Any(e => e.SolutionId == id)).GetValueOrDefault();
        }
    }
}
