namespace Backend.Entities;
    
    public class Customer : Account
    {
        public List<Machine> OwnedMachines {get; set; } = new();
        // public string? PhoneNumber {get; set; }
    }