namespace backend.Entities;
    
    public class TicketFile
    {
        public int FileId { get; set; }
        public int Ticket_Id { get; set; } = 0! ;
        public string? FileName {get; set;} = null!;
        public string? FileType {get; set;} = null!;
        public string? FilePath {get; set;} = null!;

    }