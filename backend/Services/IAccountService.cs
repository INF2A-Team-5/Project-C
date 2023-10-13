using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using backend.Dto;

namespace backend.AccountService
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