using System.Threading.Tasks;
using Flunt.Notifications;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Domain.Handlers
{
    public class ChannelHandler : Notifiable, IHandler<CreateChannelCommand>
    {
        private readonly IChannelRepository _channelRepository;
        private readonly IUserRepository _userRepository;

        public ChannelHandler(IChannelRepository channelRepository, IUserRepository userRepository)
        {
            _channelRepository = channelRepository;
            _userRepository = userRepository;
        }

        public async Task<ICommandResult> HandleAsync(CreateChannelCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, "Could not create channel", null);
            }

            GetUserByIdQueryResult user = await _userRepository.GetById(command.AdministratorId);
            if (user is null)
            {
                AddNotification(nameof(command.AdministratorId), "User not found");
                return new CommandResult(false, "Could not create channel", null);
            }

            var administrator = new User(user.Id, user.Username);
            var channel = new Channel(command.Name, command.Description, administrator);
            AddNotifications(channel);

            if (Invalid)
            {
                return new CommandResult(false, "Could not create channel", null);
            }

            await _channelRepository.CreateChannel(channel);

            return new CommandResult(true, "Channel succesfully created", new
            {
                channel.Id,
                channel.Name,
                channel.Description,
                Administrator = user
            });
        }
    }
}
