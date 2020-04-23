using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SignalRChat.Domain.Queries;

namespace SignalRChat.Domain.Repositories
{
    public interface IChatRepository
    {
        Task<PagedList<ListUserChatsQueryResult>> ListUserChatsPaginated(Guid userId, int page, int pageSize);
        Task<ListUserChatsQueryResult> GetUserChat(Guid userId, Guid chatId);
    }
}
