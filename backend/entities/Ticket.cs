namespace backend.Entities;

public class Ticket
{
    public int TicketId { get; set; }
    public PriorityType Priority { get; set; } = PriorityType.NonCritical;
    public string Client { get; set; } = null!;
    public string Date { get; set; } = null!;
    public StatusType Status { get; set; } = StatusType.Open;
}