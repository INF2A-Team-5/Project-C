using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C.Dtos.Account
{
    public class AddAccountDto
    {
        public int Id { get; set; }
        public string Name { get; set; } =  "test";
        public AccountType Class { get; set; } = AccountType.Client;

        //en meer dingfen toevoegen die bij accounts horen(gegevens uit database en andere files zoals GetAccountDto en UpdateCharacterDto)
    }
}
