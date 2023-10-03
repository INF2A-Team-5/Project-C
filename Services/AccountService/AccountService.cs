using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C.Services.CharacterService
{
    public class AccountService : IAccountService
    {
        private static List<Account> characters = new List<Account>
        {
            new Account(),
            new Account { Id = 1, Name = "Sam"}
        };
        private readonly IMapper _mapper;

        public AccountService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetCharacterDto>>> GetAllCharacters()
        {
            var serviceResponse = new ServiceResponse<List<GetCharacterDto>>();
            serviceResponse.Data = characters.Select(c => _mapper.Map<GetCharacterDto>(c)).ToList();
            return serviceResponse;
        }
    }
}