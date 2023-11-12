global using AutoMapper;
global using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using backend.AccountService;
using backend.Data;
using backend.Helpers;
using backend.Entities;

// var builder = WebApplication.CreateBuilder(args);
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<DataContext>(option => option.UseNpgsql(builder.Configuration.GetConnectionString("connection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Default", policy =>
    {
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


Machine Machine1 = new() { Name = "Machine1", Description = "This is machine 1", AccountId = 1 };
Machine Machine2 = new() { Name = "Machine2", Description = "This is machine 2", AccountId = 2 };
Machine Machine3 = new() { Name = "Machine3", Description = "This is machine 3", AccountId = 2 };
Machine Machine4 = new() { Name = "Machine4", Description = "This is machine 4", AccountId = 3 };
Machine Machine5 = new() { Name = "Machine5", Description = "This is machine 5", AccountId = 3 };
Machine Machine6 = new() { Name = "Machine6", Description = "This is machine 6", AccountId = 3 };

List<Machine> machines = new() { Machine1, Machine2, Machine3, Machine4, Machine5, Machine6 };

// string adminname = "adminname";
// string adminpw = "adminpw";
// AccountType adminClass = AccountType.Admin;

// string empname = "empname";
// string emppw = "emppw";
// AccountType empClass = AccountType.ServiceEmployee;


// string clientname = "clientname";
// string clientpw = "clientpw";
// AccountType clientClass = AccountType.Client;


Account Client = new() { Name = "clientname", Password = "clientpw", Class = AccountType.Client };
Account Employee = new() { Name = "empname", Password = "emppw", Class = AccountType.ServiceEmployee };
Account Admin = new() { Name = "adminname", Password = "adminpw", Class = AccountType.Admin };
List<Account> accounts = new() { Client, Employee, Admin };

// Ticket ticket1 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Critical", Status = "In Proces", Date_Created = DateTime.UtcNow, Solution = "Test", Pictures = "Test", PhoneNumber = "0612345678", Notes = "Test" };
// Ticket ticket2 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 3, Priority = "Non critical", Status = "In Proces", Date_Created = DateTime.UtcNow, Solution = "Test", Pictures = "Test", PhoneNumber = "0612345678", Notes = "Test" };
// Ticket ticket3 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Critical", Status = "Clossed", Date_Created = DateTime.UtcNow, Solution = "Test", Pictures = "Test", PhoneNumber = "0612345678", Notes = "Test" };
// Ticket ticket4 = new() { Machine_Id = 3, Customer_Id = 1, Assigned_Id = 2, Priority = "Critical", Status = "In Proces", Date_Created = DateTime.UtcNow, Solution = "Test", Pictures = "Test", PhoneNumber = "0612345678", Notes = "Test" };
// Ticket ticket5 = new() { Machine_Id = 3, Customer_Id = 2, Assigned_Id = 3, Priority = "Non critical", Status = "Open", Date_Created = DateTime.UtcNow, Solution = "Test", Pictures = "Test", PhoneNumber = "0612345678", Notes = "Test" };

// List<Ticket> tickets = new() { ticket1, ticket2, ticket3, ticket4, ticket5 };

var db = new DataContext();
foreach (Machine machine in machines)
{
    db.Add(machine);
}
foreach (Account account in accounts)
{
    db.Add(account);
}
// foreach (Ticket ticket in tickets)

// Account Client = new Account {Name = clientname, Password = clientpw, Class = clientClass };
// Account Employee = new Account {Name = empname, Password = emppw, Class = empClass };
// Account Admin = new Account {Name = adminname, Password = adminpw, Class = adminClass };
// List<Account> accounts = new List<Account>{Client, Employee, Admin};

// var db = new DataContext();


// foreach (Account account in accounts)

// {
//     db.Add(ticket);
// }


db.SaveChanges();

app.Run();

