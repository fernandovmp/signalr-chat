using System.Collections.Generic;
using System.Threading.Tasks;
using SignalRChat.Domain.Entities;

namespace SignalRChat.Domain.Repositories
{
    public interface IUserRepository
    {
        Task CreateUser(User user);
        Task<IEnumerable<User>> GetAll();
        Task<User> GetByUsername(string username);
        Task<bool> Exists(string username);
    }
}