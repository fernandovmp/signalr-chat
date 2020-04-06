using System.Threading.Tasks;
using SignalRChat.Domain.Entities;

namespace SignalRChat.Domain.Repositories
{
    public interface IChannelRepository
    {
        Task CreateChannel(Channel channel);
    }
}
