namespace Backend.Entities;

public class Solution
{
    public int SolutionId { get; set; }
    public string ProblemDescription { get; set; } = null!;
    public string SolutionDescription { get; set; } = null!;
    public int ModelId { get; set; } = 0!;
    public int TicketId { get; set; } = 0!;
    public bool Archived { get; set; } = false;
}