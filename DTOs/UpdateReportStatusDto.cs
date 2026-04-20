using System.ComponentModel.DataAnnotations;

namespace BugTrackerWebAPI.DTOs
{
    public class UpdateReportStatusDto
    {
        [Required]
        public int Id { get; set; }

        public int Status { get; set; }
    }
}
