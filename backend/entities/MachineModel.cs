namespace Backend.Entities;
    
    public class MachineModel
    {
        public int ModelId { get; set; }
        public string Name { get; set; } = null!;
        public string Description {get; set;} = null!;
        public Department Department {get; set; } = null!;
        public int DepartmentId {get; set; }
        public bool Archived {get; set; } = false;
        public ICollection<Solution> Solutions { get; } = new List<Solution>();
        public ICollection<Ticket> Tickets { get; } = new List<Ticket>();

    }