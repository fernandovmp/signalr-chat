using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SignalRChat.Domain.Queries;

namespace SignalRChat.Domain.Repositories
{
    public interface IChatRepository
    {
        Task<IEnumerable<ListUserChatsQueryResult>> ListUserChats(Guid userId);
        Task<ListUserChatsQueryResult> GetUserChat(Guid userId, Guid chatId);
    }
}
