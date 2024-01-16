using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Entities;
using Backend.Dto;

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

        public async Task<ActionResult<IEnumerable<Solution>>> GetSolutionsBymodelId(int id)
        {
            if (_context.Solutions == null)
            {
                return NotFound();
            }
            var solution = await _context.Solutions.Where(solution => solution.ModelId == id).ToListAsync();
            if (solution == null)
            {
                return NotFound();
            }
            return solution;
        }
        public async Task<ActionResult<IEnumerable<Solution>>> GetSolutionsByArchived(bool archived)
        {
            var solutions = await _context.Solutions.Where(s => s.Archived == archived).ToListAsync();
            if (solutions == null)
            {
                return NotFound();
            }
            return solutions;
        }

        public async Task<IActionResult> UpdateSolution(int id, SolutionDto solution)
        {
            var correct_solution = await _context.Solutions.Where(sol => sol.SolutionId == id).FirstOrDefaultAsync();
            if (id != solution.SolutionId || correct_solution == null)
            {
                return BadRequest();
            }
            correct_solution.ProblemDescription = solution.ProblemDescription;
            correct_solution.SolutionDescription = solution.SolutionDescription;
            correct_solution.Archived = solution.Archived;

            _context.Entry(correct_solution).State = EntityState.Modified;
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

        public async Task<IActionResult> ArchiveSolutionByTicketId(int ticketId)
        {
            if (_context.Solutions == null)
            {
                return NotFound();
            }
            var solutions = await _context.Solutions.Where(s => s.TicketId == ticketId).ToListAsync();
            if (solutions == null)
            {
                return NotFound();
            }
            foreach (var solution in solutions)
            {
                solution.Archived = true;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public async Task<ActionResult<Solution>> AddSolution(SolutionDto solution)
        {
            if (_context.Solutions == null)
            {
                return Problem("Entity set 'DataContext.Solutions'  is null.");
            }
            var Model = await _context.Models.Where(model => model.ModelId == solution.ModelId).FirstOrDefaultAsync();
            var Machine = await _context.Machines.Where(mach => mach.MachineId == solution.MachineId).FirstOrDefaultAsync();
            var ticket = await _context.Tickets.Where(ticket => ticket.TicketId == solution.TicketId).FirstOrDefaultAsync();
            if (Model == null || Machine == null || ticket == null)
            {
                return NotFound();
            }
            Solution new_solution = new() { ProblemDescription = solution.ProblemDescription, 
            SolutionDescription = solution.SolutionDescription, Model = Model, Machine = Machine, Ticket = ticket, Archived = false };

            _context.Solutions.Add(new_solution);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSolutionById), new { id = new_solution.SolutionId }, new_solution);
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
