namespace backend.Entities;
    
    public class Account
    {
        public int AccountId { get; set; }
        public string Name { get; set; } = null! ;
        public string Password {get; set;} = null !;
        public AccountType Class { get; set; }
    }