using BugTrackerWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerWebAPI.Repositories;

public class ReportRepository : IReportRepository
{
    private readonly BugTrackerDbContext _context;

    public ReportRepository(BugTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Report>> GetReportsAsync()
    {
        return await _context.Reports
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Report>> GetReportsByEmailAsync(string email)
    {
        return await _context.Reports
            .Where(r => r.Email == email)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Report>> GetReportsByStatusAsync(int status)
    {
        return await _context.Reports
            .Where(r => r.Status == status)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Report> CreateReportAsync(Report report)
    {
        await _context.Reports.AddAsync(report);
        await _context.SaveChangesAsync();
        return report;
    }

    public async Task<bool> DeleteReportAsync(int id)
    {
        var rowsAffected = await _context.Reports
               .Where(r => r.Id == id)
               .ExecuteDeleteAsync();

        return rowsAffected > 0;
    }
}