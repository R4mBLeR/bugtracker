using Swashbuckle.AspNetCore.Swagger;
using System.ComponentModel.DataAnnotations;

namespace BugTrackerWebAPI.Models.Auth;

public class User : BaseModel
{
    public User() { }

    public User(string username, string password, string email)
    {
        if (string.IsNullOrWhiteSpace(username))
            throw new ArgumentException("Username required");

        UserName = username;

        string hash = BCrypt.Net.BCrypt.HashPassword(password);
        Email = email;
    }

    [Required]
    [MaxLength(100)]
    public string UserName { get; set; }

    [Required]
    public string HashPassword { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

}