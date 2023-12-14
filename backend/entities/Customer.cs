namespace Backend.Entities;
    
    public class Customer
    {
        public int CustomerId {get; set; }
        public int AccountId {get; set; } 
        public Account Account {get; set; } = null!;
        public ICollection<Machine> Machines { get; } = new List<Machine>();
        public string? PhoneNumber {get; set; }
        public ICollection<Ticket> Tickets { get; } = new List<Ticket>();
    }