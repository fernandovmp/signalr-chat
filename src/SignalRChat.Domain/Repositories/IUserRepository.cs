using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Queries;

namespace SignalRChat.Domain.Repositories
{
    public interface IUserRepository
    {
        Task CreateUser(User user);
        Task<IEnumerable<ListUsersQueryResult>> ListUsers();
        Task<GetUserByIdQueryResult> GetById(Guid id);
        Task<GetByUsernameQueryResult> GetByUsername(string username);
        Task<bool> Exists(string username);
    }
}
