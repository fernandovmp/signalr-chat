using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Entities
{
    public class User : Notifiable
    {
        public User(string username)
        {
            Id = Guid.NewGuid();
            Username = username;
            AddNotifications(new Contract()
                .Requires()
                .IsNotNullOrWhiteSpace(Username, $"{nameof(User)}.{nameof(Username)}",
                    $"Username can't be null or white spaces")
                .HasMaxLen(Username, 32, $"{nameof(User)}.{nameof(Username)}",
                    "Username should be at maximum 32 characters"));
        }
        public Guid Id { get; private set; }
        public string Username { get; private set; }
    }
}