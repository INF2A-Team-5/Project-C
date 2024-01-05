using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;

namespace Backend.SolutionService
{
    public class SolutionsService : ControllerBase, ISolutionService
    {
        private readonly DataContext _context;

        public SolutionsService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Solution>>> GetAllSolutions()
        {
            if (_context.Solutions == null)
            {
                return NotFound();
            }
            return await _context.Solutions.ToListAsync();
        }

        public async Task<ActionResult<Solution>> GetSolutionById(int id)
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

        public async Task<ActionResult<IEnumerable<Solution>>> GetSolutionsBymachineId(int id)
        {
            if (_context.Solutions == null)
            {
                return NotFound();
            }
            var solution = await _context.Solutions.Where(solution => solution.MachineId == id).ToListAsync();
            if (solution == null)
            {
                return NotFound();
            }
            return solution;
        }
        public async Task<IActionResult> UpdateSolution(int id, Solution solution)
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

        public async Task<ActionResult<Solution>> AddSolution(Solution solution)
        {
            if (_context.Solutions == null)
            {
                return Problem("Entity set 'DataContext.Solutions'  is null.");
            }
            _context.Solutions.Add(solution);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSolutionById), new { id = solution.SolutionId }, solution);
        }

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

        private bool SolutionExists(int id) => (_context.Solutions?.Any(e => e.SolutionId == id)).GetValueOrDefault();
    }
}
