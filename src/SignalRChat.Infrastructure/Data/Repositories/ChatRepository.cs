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

        public async Task<ListUserChatsQueryResult> GetUserChat(Guid userId, Guid chatId)
        {
            string query = "select channels.id, channels.name, users_channels.isAdministrator "
                + "from users_channels "
                + "inner join channels on channels.id = users_channels.channelId "
                + "where users_channels.userId = @UserId and users_channels.channelId = @ChatId";
            return await _connection.QueryFirstOrDefaultAsync<ListUserChatsQueryResult>(query, new
            {
                UserId = userId,
                ChatId = chatId
            });
        }

        public async Task<PagedList<ListUserChatsQueryResult>> ListUserChatsPaginated(Guid userId, int page, int pageSize)
        {
            string query = "select channels.id, channels.name, users_channels.isAdministrator "
                + "from users_channels "
                + "inner join channels on channels.id = users_channels.channelId "
                + "where users_channels.userId = @UserId "
                + "order by users_channels.createdOn desc "
                + "OFFSET @Offset ROWS "
                + "FETCH next @PageSize Rows ONLY\n"
                + "select COUNT(*) from users_channels "
                + "where users_channels.userId = @UserId";
            int offset = (page - 1) * pageSize;
            IEnumerable<ListUserChatsQueryResult> result;
            using (SqlMapper.GridReader gridReader = await _connection.QueryMultipleAsync(query, new
            {
                PageSize = pageSize,
                Offset = offset,
                UserId = userId
            }))
            {
                result = gridReader.Read<ListUserChatsQueryResult>();
                int totalCount = await gridReader.ReadFirstAsync<int>();
                return new PagedList<ListUserChatsQueryResult>(page, pageSize, totalCount, result);
            }
        }
    }
}
