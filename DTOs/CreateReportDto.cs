using System.ComponentModel.DataAnnotations;

namespace BugTrackerWebAPI.DTOs
{
    public class CreateReportDto
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        [MaxLength(200)]
        public required string Title { get; set; }

        [MaxLength(1000)]
        public required string Description { get; set; }
    }
}
