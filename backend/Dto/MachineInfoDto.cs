using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Entities;

namespace Backend.Dto
{
    public class MachineInfoDto
    {
        public int MachineId { get; set; }
        public int ModelId {get; set; }
        public int Customer_Id {get; set;}
        public string Name { get; set; } = null!;
        public string Description {get; set; } = null!;
        public int DepartmentId {get; set; }
    }
}