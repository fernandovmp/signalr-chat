using System.Collections.Generic;
using System.Threading.Tasks;
using SignalRChat.Server.Models;

namespace SignalRChat.Server.Repositories
{
    public interface IUserRepository
    {
        Task CreateUser(User user);
        Task<IEnumerable<User>> GetAll();
        Task<bool> Exists(string username);
    }
}