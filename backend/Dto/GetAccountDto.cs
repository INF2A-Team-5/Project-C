using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dto
{
    public class GetAccountDto
    {
        public required string Name { get; set; } 
        public required string Password {get; set; } 
    }
}