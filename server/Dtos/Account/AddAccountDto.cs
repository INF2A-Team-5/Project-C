using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C.Dtos.Character
{
    public class AddAccountDto
    {
        public int Id { get; set; }
        public string Name { get; set; } =  "test";

        //en meer dingfen toevoegen die bij accounts horen(gegevens uit database en andere files zoals GetAccountDto en UpdateCharacterDto)
    }
}
