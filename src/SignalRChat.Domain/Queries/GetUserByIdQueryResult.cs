using System;

namespace SignalRChat.Domain.Queries
{
    public class GetUserByIdQueryResult
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
    }
}
