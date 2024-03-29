using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dto
{
    public class TicketDto
    {
    public int TicketId { get; set; }
    public int Machine_Id { get; set; }
    public int ModelId { get; set; }
    public int Customer_Id { get; set; }
    public int? Employee_Id { get; set; }
    public string? Employee_Name {get; set; }
    public string Title { get; set; } = null!;
    public string Priority { get; set; } = null!;
    public string Status { get; set; } = null!;
    public string Problem { get; set; } = null!;
    public string HaveTried { get; set; } = null!;
    public string MustBeDoing { get; set; } = null!;
    public string Date_Created { get; set; }
    public string? Solution { get; set; }
    public string? PhoneNumber { get; set; }
    public string[]? Notes { get; set; }
    public string[]? Files { get; set; }
    public bool Archived { get; set; } = false;
    }
}