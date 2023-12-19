namespace Backend.Entities;

public class Ticket
{
    public int TicketId { get; set; }
    public int MachineId { get; set; }
    public int CustomerId { get; set; }
    public int? EmployeeId { get; set; }
    public string Title { get; set; } = null!;
    public string Priority { get; set; } = null!;
    public string Status { get; set; } = null!;
    public string Problem { get; set; } = null!;
    public string HaveTried { get; set; } = null!;
    public string MustBeDoing { get; set; } = null!;
    public string Date_Created { get; set; }
    public string? Solution { get; set; }
    public string? PhoneNumber { get; set; }
    public string[]? Notes { get; set; }
    public string[]? Files { get; set; }

}