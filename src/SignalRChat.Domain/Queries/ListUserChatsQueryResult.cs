using System;

namespace SignalRChat.Domain.Queries
{
    public class ListUserChatsQueryResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsAdministrator { get; set; }
    }
}
