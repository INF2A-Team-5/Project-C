namespace Backend.Entities;

public class Solution
{
    public int SolutionId { get; set; }
    public string ProblemDescription { get; set; } = null!;
    public string SolutionDescription { get; set; } = null!;
    public MachineModel Model {get; set; } = null!;
    public Machine Machine {get; set; } = null!;
    public Ticket Ticket {get; set; } = null!;
    public int MachineId {get; set; }
    public int ModelId { get; set; }
    public int TicketId { get; set; }
    public bool Archived { get; set; } = false;
}