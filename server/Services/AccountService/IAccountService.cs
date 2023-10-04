using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C.Services.AccountService
{
    public interface IAccountService
    {
        Task<ServiceResponse<List<GetAccountDto>>> GetAllAccounts();
        Task<ServiceResponse<GetAccountDto>> GetAccountById(int id);
        Task<ServiceResponse<List<GetAccountDto>>> AddAccount(AddAccountDto newAccount);
        Task<ServiceResponse<GetAccountDto>> UpdateAccount(UpdateAccountDto updatedAccount);
        Task<ServiceResponse<List<GetAccountDto>>> DeleteAccounts(int id);
    }
}