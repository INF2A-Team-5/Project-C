using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Entities;

namespace Backend.Dto
{
    public class CustomerInfoDto
    {
        public int CustomerId {get; set; }
        public int AccountId {get; set; } 
        public string Name {get; set; } = null!;
    }
}