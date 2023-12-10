namespace Backend.Entities;
    
    public class Machine
    {
        public int MachineId { get; set; }
        public string Name { get; set; } = null! ;
        public string Description {get; set;} = null !;
        public int? AccountId {get; set;}
        public string? Solution {get; set; } = null; 
        public int DepartmentId {get; set; }
    }