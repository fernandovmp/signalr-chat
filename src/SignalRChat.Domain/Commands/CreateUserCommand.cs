using Flunt.Notifications;
using Flunt.Validations;
using SignalRChat.Domain.Entities;

namespace SignalRChat.Domain.Commands
{
    public class CreateUserCommand : Notifiable, ICommand
    {
        public string Username { get; set; }
        public void Validate()
        {
            AddNotifications(new Contract()
                .Requires()
                .IsNotNullOrWhiteSpace(Username, $"{nameof(User)}.{nameof(Username)}",
                    $"Username can't be null or white spaces")
                .HasMaxLen(Username, 32, $"{nameof(User)}.{nameof(Username)}",
                    "Username should be at maximum 32 characters"));
        }
    }
}