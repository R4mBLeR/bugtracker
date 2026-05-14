using BugTrackerWebAPI.DTOs;
using BugTrackerWebAPI.Models.Auth;

namespace BugTrackerWebAPI.Repositories;
public interface IUserRepository
{
        public Task AddAsync(User user);
        public Task<User?> GetByEmailAsync(string email);

}
