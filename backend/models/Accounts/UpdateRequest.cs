namespace backend.Accounts;

using System.ComponentModel.DataAnnotations;
using backend.Entities;

public class UpdateRequest
{
    public long Id {get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public AccountType Class { get; set; }


    private string replaceEmptyWithNull(string value)
    {
        return string.IsNullOrEmpty(value) ? null : value;
    }
}