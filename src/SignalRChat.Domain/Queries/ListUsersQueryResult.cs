using System;

namespace SignalRChat.Domain.Queries
{
    public class ListUsersQueryResult
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
    }
}