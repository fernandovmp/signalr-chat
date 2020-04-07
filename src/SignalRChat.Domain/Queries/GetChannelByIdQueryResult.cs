using System;

namespace SignalRChat.Domain.Queries
{
    public class GetChannelByIdQueryResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid AdministratorId { get; set; }
    }
}
