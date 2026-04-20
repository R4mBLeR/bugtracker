using BugTrackerWebAPI.DTOs;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BugTrackerWebAPI.Models;

public class Report
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; }

    [Required]
    [MaxLength(1000)]
    public string Description { get; set; }

    [DefaultValue(0)]
    public int Status { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Report(string email, string title, string description, int status, DateTime createdAt)
    {
        Email = email;
        Title = title;
        Description = description;
        Status = status;
        CreatedAt = createdAt;
    }

    public Report(CreateReportDto createReportDto)
    {
        Email = createReportDto.Email;
        Title = createReportDto.Title;
        Description = createReportDto.Description;
    }
}