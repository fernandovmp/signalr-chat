using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Infrastructure.Data.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly IDbConnection _connection;
        public ChatRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<ListUserChatsQueryResult>> ListUserChats(Guid userId)
        {
            string query = "select channels.id, channels.name, users_channels.isAdministrator "
                + "from users_channels "
                + "inner join channels on channels.id = users_channels.channelId "
                + "where users_channels.userId = @UserId";
            return await _connection.QueryAsync<ListUserChatsQueryResult>(query, new
            {
                UserId = userId
            });
        }
    }
}
