namespace Backend.Entities;

public class Account
{
    public int AccountId { get; set; }
    public string Name { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string? PhoneNumber { get; set; } // moet weg straks (staat nu bij Customer)
    public AccountType Class { get; set; }
    public bool Archived { get; set; } = false;
}