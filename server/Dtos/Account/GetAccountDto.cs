using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C.Dtos.Account
{
    public class GetAccountDto
    {
        public int Id { get; set; }
        public string Name { get; set; } =  "test";
        public AccountType Class { get; set; } = AccountType.Client;
    }
}