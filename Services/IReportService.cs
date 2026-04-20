using BugTrackerWebAPI.DTOs;
using BugTrackerWebAPI.Models;

namespace BugTrackerWebAPI.Services;

public interface IReportService
{
    Task<IEnumerable<Report>> GetAllReportsAsync();
    Task<Report> GetReportByIdAsync(int id);
    Task<Report> CreateReportAsync(CreateReportDto createReportDto);
    Task<Report> UpdateReportStatusAsync(UpdateReportStatusDto updateReportDto);
    Task<bool> DeleteReportAsync(int id);
}