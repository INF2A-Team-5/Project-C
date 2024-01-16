using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dto
{
    public class SolutionDto
    {
    public int SolutionId { get; set; }
    public string ProblemDescription { get; set; } = null!;
    public string SolutionDescription { get; set; } = null!;
    public int MachineId {get; set; }
    public int ModelId { get; set; }
    public int TicketId { get; set; }
    public bool Archived { get; set; } = false;
    }
}