using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Queries;

namespace SignalRChat.Domain.Repositories
{
    public interface IChannelRepository
    {
        Task CreateChannel(Channel channel);
        Task<GetChannelByIdQueryResult> GetById(Guid id);
        Task UpdateChannelName(Guid id, string name);
        Task UpdateChannelDescription(Guid id, string description);
        Task DeleteChannel(Guid id);
        Task<IEnumerable<ListChannelsQueryResult>> ListChannels();
        Task<PagedList<ListChannelsQueryResult>> ListChannelsPaginated(int page, int pageSize);
        Task<bool> UserIsMemberOfChannel(Guid userId, Guid channelId);
        Task AddUserToChannel(Guid userId, Guid channelId, bool isAdministrator);
    }
}
