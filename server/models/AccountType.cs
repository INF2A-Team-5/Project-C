using System.Text.Json.Serialization;

namespace Project_C.models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum AccountType
    {
        Admin = 1,
        Client,
        ServiceEmployee        
    }
}