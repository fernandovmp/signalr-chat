using SignalRChat.Domain.Entities;

namespace SignalRChat.Domain.Commands
{
    public class CreateUserCommandResult : CommandResult
    {
        public CreateUserCommandResult(bool success, string message, User user) : base(success, message)
        {
            User = user;
        }
        public User User { get; }
    }
}
