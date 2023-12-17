using Backend.AccountService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Entities;
using Backend.Dto;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static LoginDto loginAccount = new();
        private readonly DataContext _dataContext = new();
        private readonly IConfiguration _configuration;
        private readonly IAccountService _userService;

        public AuthController(IConfiguration configuration, IAccountService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("login")] public async Task<ActionResult<IEnumerable<Account>>> CheckLogin(GetAccountDto request)
        {
            if (_dataContext == null)
            {
                return BadRequest("accountdb is null");
            }
            loginAccount.Name = request.Name;
            string encryptedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var correspondingAccount = await _dataContext.Accounts.Where(acc => acc.Name == loginAccount.Name).FirstOrDefaultAsync();
            if (correspondingAccount == null)
            {
                return NotFound("Invalid credentials");
            }
            if (correspondingAccount.Name == request.Name && BCrypt.Net.BCrypt.Verify(correspondingAccount.Password, encryptedPassword))
            {
                loginAccount.AccountId = correspondingAccount!.AccountId;
                loginAccount.Class = correspondingAccount.Class;
                loginAccount.Token = CreateToken(correspondingAccount);
                return Ok(loginAccount);
            }
            return NotFound("Invalid credentials");
        }
        [HttpPost("auth")] public async Task<ActionResult<Boolean>> CheckAuth(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler(); 
            var DecodedToken = tokenHandler.ReadJwtToken(token);
            string name = DecodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            string role = DecodedToken.Claims.First(claim => claim.Type == "role").Value;
            AccountType Class = new();
            switch (role)
            {
                case "Admin":
                Class = AccountType.Admin;
                break;
                case "Client":
                Class = AccountType.Client;
                break;
                case "ServiceEmployee":
                Class = AccountType.ServiceEmployee;
                break;
            }
            if (_dataContext.Accounts == null)
            {
                return BadRequest();
            }
            var account = (from accs in _dataContext.Accounts where accs.Name == name && accs.Class == Class select accs).FirstOrDefaultAsync();
            if (account != null)
            {
                return Ok(true);
            }
            return NotFound();
        }

        private string CreateToken(Account account)
        {
            var claims = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.Name, account.Name),
                new Claim(ClaimTypes.Role, account.Class.ToString()),
            });
            var k =  _configuration.GetSection("AppSettings:Token").Value!;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(k));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var expiry = DateTime.Now.AddHours(1);
            var tokenDescriptor = new SecurityTokenDescriptor 
            { 
                Subject = claims, 
                Expires = expiry, 
                Issuer = "Viscon", //aanpassen later? 
                Audience = "Viscon_accounts",
                SigningCredentials = creds, 
            }; 
            //initiate the token handler 
            var tokenHandler = new JwtSecurityTokenHandler(); 
            var tokenJwt = tokenHandler.CreateToken(tokenDescriptor); 
            var token = tokenHandler.WriteToken(tokenJwt);
            
            return token;
        }
    }
}