using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Infrastructure.Data.Repositories
{
    public class ChannelRepository : IChannelRepository
    {
        private readonly IDbConnection _connection;

        public ChannelRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task CreateChannel(Channel channel)
        {
            string query = "insert into channels(id, name, description, administratorId) "
                + "values(@Id, @Name, @Description, @AdministratorId);";
            await _connection.ExecuteAsync(query, new
            {
                channel.Id,
                channel.Name,
                channel.Description,
                AdministratorId = channel.Administrator.Id
            });
        }
        public async Task DeleteChannel(Guid id)
        {
            string query = "delete from channels where id = @Id;";
            await _connection.ExecuteAsync(query, new
            {
                Id = id
            });
        }
        public async Task<GetChannelByIdQueryResult> GetById(Guid id)
        {
            string query = "select id, name, description, administratorId from channels where id = @Id;";
            return await _connection.QueryFirstOrDefaultAsync<GetChannelByIdQueryResult>(query, new
            {
                Id = id
            });
        }

        public async Task<IEnumerable<ListChannelsQueryResult>> ListChannels()
        {
            string query = "select channels.id, channels.name, channels.description, "
                + "users.id as 'administratorId', users.username as 'administratorUsername' "
                + "from channels "
                + "inner join users on users.id = channels.administratorId";
            return await _connection.QueryAsync<ListChannelsQueryResult, ListChannelsUsersJoinResult, ListChannelsQueryResult>(
                query,
                (channel, administrator) =>
                {
                    channel.Administrator = new ListUsersQueryResult
                    {
                        Id = administrator.AdministratorId,
                        Username = administrator.AdministratorUsername
                    };
                    return channel;
                },
                splitOn: "administratorId"
            );
        }

        public async Task UpdateChannelDescription(Guid id, string description)
        {
            string query = "update channels set description = @Description where id = @Id;";
            await _connection.ExecuteAsync(query, new
            {
                Id = id,
                Description = description
            });
        }
        public async Task UpdateChannelName(Guid id, string name)
        {
            string query = "update channels set name = @Name where id = @Id;";
            await _connection.ExecuteAsync(query, new
            {
                Id = id,
                Name = name
            });
        }
        public async Task AddUserToChannel(Guid userId, Guid channelId, bool isAdministrator)
        {
            string query = "insert into users_channels(userId, channelId, isAdministrator) "
                + "values(@UserId, @ChannelId, @IsAdministrator);";
            await _connection.ExecuteAsync(query, new
            {
                UserId = userId,
                ChannelId = channelId,
                IsAdministrator = isAdministrator
            });
        }
        public async Task<bool> UserIsMemberOfChannel(Guid userId, Guid channelId)
        {
            string query = @"select top 1 1 from users_channels where userId = @UserId and channelId = @ChannelId;";
            int? result = await _connection.QueryFirstOrDefaultAsync<int?>(query, new
            {
                UserId = userId,
                ChannelId = channelId
            });
            return result.HasValue;
        }
    }
}
