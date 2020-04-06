using System;
using Flunt.Notifications;
using Flunt.Validations;

namespace SignalRChat.Domain.Entities
{
    public class User : Notifiable
    {
        public User(Guid id, string username)
        {
            Id = id;
            Username = username;
            AddNotifications(new Contract()
                .Requires()
                .IsNotNullOrWhiteSpace(Username, nameof(Username),
                    "Username can't be null or white spaces")
                .HasMaxLen(Username, 32, nameof(Username),
                    "Username should be at maximum 32 characters"));
        }
        public User(string username) : this(Guid.NewGuid(), username)
        {
        }

        public Guid Id { get; private set; }
        public string Username { get; private set; }
    }
}
