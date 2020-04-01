using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _connection;
        public UserRepository(IDbConnection connection)
        {
            _connection = connection;
        }
        public async Task CreateUser(User user)
        {
            string query = @"insert into users(id, username) values(@Id, @Username)";
            await _connection.ExecuteAsync(query, user);
        }
        public async Task<bool> Exists(string username)
        {
            string query = @"select top 1 1 from users where username = @Username;";
            int? result = await _connection.QueryFirstOrDefaultAsync<int?>(query, new { Username = username });
            return result.HasValue;
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            string query = "select id, username from users;";
            return await _connection.QueryAsync<User>(query);
        }
        public async Task<User> GetByUsername(string username)
        {
            string query = "select id, username from users where username = @Username;";
            return await _connection.QueryFirstOrDefaultAsync<User>(query, new { Username = username });
        }
    }
}