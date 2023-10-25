namespace backend.Entities;
    
    public class Machine
    {
        public int MachineId { get; set; }
        public string Name { get; set; } = null! ;
        public string Description {get; set;} = null !;
        public int AccountId {get; set;} 
    }