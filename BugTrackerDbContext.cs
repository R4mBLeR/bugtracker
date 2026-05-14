using BugTrackerWebAPI.Models;
using BugTrackerWebAPI.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerWebAPI;

public class BugTrackerDbContext : DbContext
{
    public BugTrackerDbContext(DbContextOptions<BugTrackerDbContext> options) 
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Report> Reports { get; set; }
}