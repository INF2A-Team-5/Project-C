using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto
{
    public class AddAccountDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Password {get; set; } 
        public AccountType Class { get; set; }

        //en meer dingfen toevoegen die bij accounts horen(gegevens uit database en andere files zoals GetAccountDto en UpdateCharacterDto)
    }
}