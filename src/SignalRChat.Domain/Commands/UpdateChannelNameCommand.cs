using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Commands
{
    public class UpdateChannelNameCommand : Notifiable, ICommand
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid AdministratorId { get; set; }
        public void Validate()
        {
            AddNotifications(new Contract()
                .Requires()
                .IsNotNullOrWhiteSpace(Name, nameof(Name), "Channel name can't be null or white spaces")
                .HasMaxLen(Name, 32, nameof(Name), "Channel name should be at maximum 32 characters")
            );
        }
    }
}
