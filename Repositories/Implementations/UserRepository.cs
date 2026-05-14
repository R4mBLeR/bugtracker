using BugTrackerWebAPI.DTOs;
using BugTrackerWebAPI.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerWebAPI.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private BugTrackerDbContext _dbContext;
        
        public UserRepository(BugTrackerDbContext context)
        {
            _dbContext = context;
        }

        public async Task AddAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var user = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return null;  
            }

            return user;
        }
    }
}
