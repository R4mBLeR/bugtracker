using BugTrackerWebAPI.Models;

namespace BugTrackerWebAPI.Repositories;

public interface IReportRepository
{
    Task<IEnumerable<Report>> GetReportsAsync();
    Task<IEnumerable<Report>> GetReportsByEmailAsync(string email);
    Task<IEnumerable<Report>> GetReportsByStatusAsync(int status);

    Task<Report> CreateReportAsync(Report report);

    Task<bool> DeleteReportAsync(int id);
}