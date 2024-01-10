using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Backend.Dto
{
    public class LoginDto
    {
        public int AccountId { get; set; }
        public string Name { get; set; } = null!;
        public AccountType Class { get; set; }
        public string Token {get; set; } = null!;
    }
}