using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Commands
{
    public class UpdateChannelDescriptionCommand : Notifiable, ICommand
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid AdministratorId { get; set; }
        public void Validate()
        {
            AddNotifications(new Contract()
                .Requires()
                .HasMaxLengthIfNotNullOrEmpty(Description, 100,
                    nameof(Description), "Channel description should be at maximum 100 characters")
            );
        }
    }
}
