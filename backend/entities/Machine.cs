namespace Backend.Entities;
    
    public class Machine
    {
        public int MachineId { get; set; }
        public int ModelId {get; set; }
        public MachineModel Model {get; set; } = null!;
        public Customer? Customer {get; set; }
        public int? Customer_Id {get; set;}
    }