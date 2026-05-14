using System.ComponentModel.DataAnnotations;

namespace BugTrackerWebAPI.Models;

public class BaseModel
{
    [Key]
    public int Id { get; set; }
}