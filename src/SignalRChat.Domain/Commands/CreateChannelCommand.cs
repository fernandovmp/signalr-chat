using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Commands
{
    public class CreateChannelCommand : Notifiable, ICommand
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid AdministratorId { get; set; }

        public void Validate()
        {
            AddNotifications(new Contract()
                .Requires()
                .IsNotNullOrWhiteSpace(Name, nameof(Name), "Channel name can't be null or white spaces")
                .HasMaxLen(Name, 32, nameof(Name), "Channel name should be at maximum 32 characters")
                .HasMaxLengthIfNotNullOrEmpty(Description, 100,
                    nameof(Description), "Channel description should be at maximum 100 characteres")
            );
        }
    }
}
