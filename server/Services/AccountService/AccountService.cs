using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private static List<Account> accounts = new List<Account>
        {
            new Account(),
            new Account { Id = 1, Name = "admin"}
        };
        private readonly IMapper _mapper;

        public AccountService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> AddAccount(AddAccountDto newAccount)
        {
            var serviceResponse = new ServiceResponse<List<GetAccountDto>>();
            var account = _mapper.Map<Account>(newAccount);
            account.Id = accounts.Max(c => c.Id) + 1;
            accounts.Add(account);
            serviceResponse.Data = accounts.Select(c => _mapper.Map<GetAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> DeleteAccounts(int id)
        {
            var serviceResponse = new ServiceResponse<List<GetAccountDto>>();

            try
            {
                var account = accounts.FirstOrDefault(c => c.Id == id);
                if(account is null){
                    throw new Exception($"Character with Id '{id}' not found.");
                }

                accounts.Remove(account);

                serviceResponse.Data = accounts.Select(c => _mapper.Map<GetAccountDto>(c)).ToList();

            }
            catch(Exception ex)
            {
                serviceResponse.Succes = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> GetAllAccounts()
        {
            var serviceResponse = new ServiceResponse<List<GetAccountDto>>();
            serviceResponse.Data = accounts.Select(c => _mapper.Map<GetAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetAccountDto>> GetAccountById(int id)
        {
            var serviceResponse = new ServiceResponse<GetAccountDto>();
            var account = accounts.FirstOrDefault(c => c.Id == id);
            serviceResponse.Data = _mapper.Map<GetAccountDto>(account);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetAccountDto>> UpdateAccount(UpdateAccountDto updatedAccount)
        {
            var serviceResponse = new ServiceResponse<GetAccountDto>();

            try
            {
                var account = accounts.FirstOrDefault(c => c.Id == updatedAccount.Id);
                if(account is null){
                    throw new Exception($"Character with Id '{updatedAccount.Id}' not found.");
                }

                account.Name = updatedAccount.Name;
                account.Id = updatedAccount.Id;

                serviceResponse.Data = _mapper.Map<GetAccountDto>(account);

            }
            catch(Exception ex)
            {
                serviceResponse.Succes = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}