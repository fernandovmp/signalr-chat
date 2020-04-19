using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Commands
{
    public class JoinChannelCommand : Notifiable, ICommand
    {
        public Guid ChannelId { get; set; }
        public Guid UserId { get; set; }
        public void Validate()
        {
            AddNotifications(new Contract()
                .Requires()
                .IsNotEmpty(ChannelId, nameof(ChannelId), "Channel id must be valid")
                .IsNotEmpty(UserId, nameof(UserId), "User id must be valid"));
        }
    }
}
