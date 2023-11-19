using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Data;
using AutoMapper;
using backend.Dto;
using backend.models;

namespace backend.AccountService
{
    public class AccountService : IAccountService
    {
        private static List<Account> accounts = new List<Account>
        {
            new Account(),
            new Account { AccountId = 1, Name = "admin"}
        };
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AccountService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> AddAccount(AddAccountDto newAccount)
        {
            var serviceResponse = new ServiceResponse<List<GetAccountDto>>();
            var account = _mapper.Map<Account>(newAccount);
            account.AccountId = accounts.Max(c => c.AccountId) + 1;
            accounts.Add(account);
            serviceResponse.Data = accounts.Select(c => _mapper.Map<GetAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> DeleteAccounts(int id)
        {
            var serviceResponse = new ServiceResponse<List<GetAccountDto>>();

            try
            {
                var account = accounts.FirstOrDefault(c => c.AccountId == id);
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
            var DbAccounts = await _context.Accounts.ToListAsync();
            serviceResponse.Data = DbAccounts.Select(c => _mapper.Map<GetAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetAccountDto>> GetAccountById(int id)
        {
            var serviceResponse = new ServiceResponse<GetAccountDto>();
            var DbAccount = await _context.Accounts.FirstOrDefaultAsync(c => c.AccountId == id);
            serviceResponse.Data = _mapper.Map<GetAccountDto>(DbAccount);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetAccountDto>> UpdateAccount(UpdateAccountDto updatedAccount)
        {
            var serviceResponse = new ServiceResponse<GetAccountDto>();

            try
            {
                var account = accounts.FirstOrDefault(c => c.AccountId == updatedAccount.AccountId);
                if(account is null){
                    throw new Exception($"Character with Id '{updatedAccount.AccountId}' not found.");
                }

                account.Name = updatedAccount.Name;
                account.AccountId = updatedAccount.AccountId;

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