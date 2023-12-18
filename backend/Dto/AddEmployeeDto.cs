using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Entities;

namespace Backend.Dto
{
    public class AddEmployeeDto
    {
        public int EmployeeId {get; set; }
        public int DepartmentId {get; set; }
        public int AccountId {get; set; }
        public ICollection<Ticket> Tickets { get; } = new List<Ticket>();
    }
}