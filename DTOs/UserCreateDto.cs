namespace BugTrackerWebAPI.DTOs;
using System.ComponentModel.DataAnnotations;

public class UserCreateDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }

}
