using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum AccountType
{
    Admin = 1,
    Client,
    ServiceEmployee        
}