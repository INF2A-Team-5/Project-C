namespace Backend.Entities;
    
    public class Customer : Account
    {
        public List<Machine> OwnedMachines {get; set; } = new();
        // public string? PhoneNumber {get; set; }
        // public List<Ticket> Tickets {get; set; } = new List<Ticket>();
    }