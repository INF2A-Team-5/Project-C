using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto
{
    public class GetAccountDto
    {
        public long Id { get; set; }
        public string Name { get; set; } 
        public string Password {get; set; } 
        public AccountType Class { get; set; }
    }
}