using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace backend.Dto
{
    public class LoginDto
    {
        public int AccountId { get; set; }
        public string Name { get; set; } 
        public AccountType Class { get; set; }
        public string Token {get; set; } = null!;
    }
}