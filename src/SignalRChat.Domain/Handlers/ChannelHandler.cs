using System.Threading.Tasks;
using Flunt.Notifications;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Domain.Handlers
{
    public class ChannelHandler : Notifiable,
        IHandler<CreateChannelCommand>,
        IHandler<UpdateChannelNameCommand>
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

        public async Task<ICommandResult> HandleAsync(UpdateChannelNameCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, "Could not update channel name", null);
            }

            GetChannelByIdQueryResult channel = await _channelRepository.GetById(command.Id);
            if (channel is null)
            {
                AddNotification(nameof(command.Id), "Channel not found");
                return new CommandResult(false, "Could not update channel name", null);
            }
            if (command.AdministratorId != channel.AdministratorId)
            {
                AddNotification(nameof(command.AdministratorId), "AdministratorId does't match channel administrator id");
                return new CommandResult(false, "User does't have permission to update channel name", null);
            }
            if (channel.Name != command.Name)
            {
                await _channelRepository.UpdateChannelName(channel.Id, channel.Name);
            }
            return new CommandResult(true, "Name successfully updated", new
            {
                channel.Id,
                channel.Name
            });
        }
    }
}
