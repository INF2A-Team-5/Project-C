namespace Backend.Entities;
    
    public class MachineModel
    {
        public int ModelId { get; set; }
        public string Name { get; set; } = null! ;
        public string Description {get; set;} = null!;
        public string? Solution {get; set; } = null; 
        public Department Department {get; set; } = null!;
        public int DepartmentId {get; set; }
    }