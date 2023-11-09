namespace backend.Entities;

public class Ticket
{
    public int TicketId { get; set; }
    public int Machine_Id { get; set; }
    public int Costumer_Id { get; set; }
    public int Assigned_Id { get; set; }
    public string Priority { get; set; } = null!;
    public string Status { get; set; } = null!;
    public DateTime Date_Created { get; set; }
    public Dictionary<string, string> Information = new Dictionary<string, string>();
    public string Solution { get; set; }
    public string Pictures { get; set; }
    public string PhoneNumber { get; set; }
    public string Notes { get; set; }
}