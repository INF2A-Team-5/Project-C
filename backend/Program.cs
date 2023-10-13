global using AutoMapper;
global using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using backend.AccountService;
using backend.Data;
using backend.Helpers;


// var builder = WebApplication.CreateBuilder(args);
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<DataContext>(option=> option.UseNpgsql(builder.Configuration.GetConnectionString("connection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("Default", policy =>{
        policy.AllowAnyOrigin();
    });
});

builder.Services.AddControllers().AddJsonOptions(x =>
    {
        // serialize enums as strings in api responses (e.g. Role)
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

        // ignore omitted parameters on models to enable optional params (e.g. User update)
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
builder.Services.AddScoped<IAccountService, AccountService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// app.UseCors("Default");

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

// string adminname = "adminname";
// string adminpw = "adminpw";
// AccountType adminClass = AccountType.Admin;

// string empname = "empname";
// string emppw = "emppw";
// AccountType empClass = AccountType.ServiceEmployee;

// string clientname = "clientname";
// string clientpw = "clientpw";
// AccountType clientClass = AccountType.Client;

// Account Client = new Account {Name = clientname, Password = clientpw, Class = clientClass };
// Account Employee = new Account {Name = empname, Password = emppw, Class = empClass };
// Account Admin = new Account {Name = adminname, Password = adminpw, Class = adminClass };
// List<Account> accounts = new List<Account>{Client, Employee, Admin};


// foreach (Account account in accounts)
// {
//     db.Add(account);
//     db.SaveChanges();
// }