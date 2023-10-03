using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C.Services.CharacterService
{
    public interface IAccountService
    {
        Task<ServiceResponse<List<GetCharacterDto>>> GetAllCharacters();
    }
}