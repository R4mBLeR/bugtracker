using BugTrackerWebAPI.DTOs;
using BugTrackerWebAPI.Models;

namespace BugTrackerWebAPI.Services;

public interface IReportService
{
    Task<IEnumerable<Report>> GetAllReportsAsync();
    Task<Report> GetReportByIdAsync(int id);
    Task<Report> CreateReportAsync(ReportCreateDto createReportDto);
    Task<Report> UpdateReportStatusAsync(ReportUpdateDto updateReportDto);
    Task<bool> DeleteReportAsync(int id);
}