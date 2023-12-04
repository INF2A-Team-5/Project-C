using Backend.Entities;

namespace Backend.Entities;
    
    public class Employee : Account
    {
        public int DepartmentId {get; set; }
        public Department department {get; set; }
    }