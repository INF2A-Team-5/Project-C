using Backend.Entities;

namespace Backend.Entities;
    
    public class Employee
    {
        public int EmployeeId {get; set; }
        public int DepartmentId {get; set; }
        public Department Department {get; set; } = null!;
        public Account Account {get; set; } = null!;
        public int AccountId {get; set; }
        public ICollection<Ticket> Tickets { get; } = new List<Ticket>();
    }