using BugTrackerWebAPI.DTOs;
using BugTrackerWebAPI.Models;
using BugTrackerWebAPI.Repositories;

namespace BugTrackerWebAPI.Services;

public class ReportService : IReportService
{
    private readonly IReportRepository _reportRepository;
    private readonly ILogger<ReportService> _logger;

    public ReportService(IReportRepository reportRepository, ILogger<ReportService> logger)
    {
        _reportRepository = reportRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<Report>> GetAllReportsAsync()
    {
        try
        {
            var reports = await _reportRepository.GetReportsAsync();
            return reports;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<Report> GetReportByIdAsync(int id)
    {
        try
        {
            var reports = await _reportRepository.GetReportsAsync();
            var report = reports.FirstOrDefault(r => r.Id == id);

            if (report == null)
            {
                throw new KeyNotFoundException($"Report with id {id} not found");
            }

            return report;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<Report> CreateReportAsync(CreateReportDto createReportDto)
    {
        Report report = new Report(createReportDto);
        var createdReport = await _reportRepository.CreateReportAsync(report);
        return createdReport;
    }

    public async Task<Report> UpdateReportStatusAsync(UpdateReportStatusDto updateReportDto)
    {
        try
        {
            var reports = await _reportRepository.GetReportsAsync();
            var report = reports.FirstOrDefault(r => r.Id == updateReportDto.Id);

            if (report == null)
            {
                throw new KeyNotFoundException($"");
            }

            report.Status = updateReportDto.Status;
            return report;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<bool> DeleteReportAsync(int id)
    {
        try
        {
            var result = await _reportRepository.DeleteReportAsync(id);
            return result;
        }
        catch (Exception ex)
        {
            throw;
        }
    }
}