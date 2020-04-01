using System.Threading.Tasks;
using Flunt.Notifications;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Domain.Handlers
{
    public class CreateUserHandler : Notifiable, IHandler<CreateUserCommand>
    {
        private readonly IUserRepository _repository;
        public CreateUserHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> HandleAsync(CreateUserCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, "Could not create user", null);
            }

            if (await _repository.Exists(command.Username))
            {
                AddNotification(nameof(command.Username), "User already exists");
            }

            var user = new User(command.Username);
            AddNotifications(user);
            if (Invalid)
            {
                return new CommandResult(false, "Could not create user", null);
            }

            await _repository.CreateUser(user);

            return new CommandResult(true, "User succesfully created", new
            {
                user.Id,
                user.Username
            });
        }
    }
}