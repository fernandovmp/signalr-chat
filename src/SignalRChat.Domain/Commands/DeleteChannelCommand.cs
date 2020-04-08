using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Commands
{
    public class DeleteChannelCommand : Notifiable, ICommand
    {
        public Guid ChannelId { get; set; }
        public Guid AdministratorId { get; set; }
        public void Validate()
        {
            AddNotifications(new Contract()
                .Requires()
                .IsNotEmpty(ChannelId, nameof(ChannelId), "Channel id must be valid")
                .IsNotEmpty(AdministratorId, nameof(AdministratorId), "Administrator id must be valid")
            );
        }
    }
}
