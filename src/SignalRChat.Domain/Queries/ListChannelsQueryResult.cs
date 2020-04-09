using System;

namespace SignalRChat.Domain.Queries
{
    public class ListChannelsQueryResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ListUsersQueryResult Administrator { get; set; }
    }

    public class ListChannelsUsersJoinResult
    {
        public Guid AdministratorId { get; set; }
        public string AdministratorUsername { get; set; }
    }
}
