using BugTrackerWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerWebAPI;

public class BugTrackerDbContext : DbContext
{
    public BugTrackerDbContext(DbContextOptions<BugTrackerDbContext> options) 
        : base(options)
    {
    }
    
    public DbSet<Report> Reports { get; set; }
}