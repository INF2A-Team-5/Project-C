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


// Ticket ticket1 = new() { Client = "Client1", Date = "25-10-2023" };
// Ticket ticket2 = new() { Client = "Client2", Date = "26-10-2023", Status = StatusType.InProcess };
// Ticket ticket3 = new() { Client = "Client3", Date = "27-10-2023", Priority = PriorityType.Critical };
// Ticket ticket4 = new() { Client = "Client2", Date = "28-10-2023" };
// Ticket ticket5 = new() { Client = "Client1", Date = "29-10-2023", Priority = PriorityType.Critical };
// List<Ticket> tickets = new() { ticket1, ticket2, ticket3, ticket4, ticket5 };

// Machine Machine1 = new() { Name = "Machine1", Description = "This is machine 1", AccountId = 7 };
// Machine Machine2 = new() { Name = "Machine2", Description = "This is machine 2", AccountId = 7 };
// Machine Machine3 = new() { Name = "Machine3", Description = "This is machine 3", AccountId = 8 };
// Machine Machine4 = new() { Name = "Machine3", Description = "This is machine 4", AccountId = 8 };
// Machine Machine5 = new() { Name = "Machine3", Description = "This is machine 5", AccountId = 9 };
// Machine Machine6 = new() { Name = "Machine3", Description = "This is machine 6", AccountId = 9 };

// List<Machine> machines = new() { Machine1, Machine2, Machine3, Machine4, Machine5, Machine6 };


// Account Client = new() { Name = "clientname", Password = "clientpw", Class = AccountType.Client };
// Account Employee = new() { Name = "empname", Password = "emppw", Class = AccountType.ServiceEmployee };
// Account Admin = new() { Name = "adminname", Password = "adminpw", Class = AccountType.Admin };
// List<Account> accounts = new() { Client, Employee, Admin };

// var db = new DataContext();
// foreach (Machine machine in machines)
// {
//     db.Add(machine);
// }
// foreach (Account account in accounts)
// {
//     db.Add(account);
// }

// foreach (Ticket ticket in tickets)
// {
//     db.Add(ticket);
// }

// db.SaveChanges();

app.Run();