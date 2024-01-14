using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

public class Department
{
    public int DepartmentId { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Employee> Employees { get; } = new List<Employee>();
    public bool Archived { get; set; } = false;
}