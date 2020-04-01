using System;

namespace SignalRChat.Domain.Queries
{
    public class GetByUsernameQueryResult
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
    }
}