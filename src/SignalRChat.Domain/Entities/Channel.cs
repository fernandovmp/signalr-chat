using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Entities
{
    public class Channel : Notifiable
    {
        public Channel(string name, string description, User administrator)
        {
            Id = Guid.NewGuid();
            Name = name;
            Description = description;
            Administrator = administrator;
            AddNotifications(new Contract()
                .Requires()
                .IsNotNullOrWhiteSpace(Name, nameof(Name), "Channel name can't be null or white spaces")
                .HasMaxLen(Name, 32, nameof(Name), "Channel name should be at maximum 32 characters")
                .HasMaxLengthIfNotNullOrEmpty(Description, 100,
                    nameof(Description), "Channel description should be at maximum 100 characteres")
                .Join(administrator)
            );
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public User Administrator { get; private set; }
    }
}
