using System.ComponentModel.DataAnnotations;

namespace BugTrackerWebAPI.DTOs
{
    public class ReportUpdateDto
    {
        [Required]
        public int Id { get; set; }

        public int Status { get; set; }
    }
}
