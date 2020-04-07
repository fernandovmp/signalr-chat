using System;
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
    }
}
