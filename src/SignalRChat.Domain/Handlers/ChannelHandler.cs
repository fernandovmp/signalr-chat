using System.Threading.Tasks;
using Flunt.Notifications;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.DataOutputs;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Domain.Handlers
{
    public class ChannelHandler : HandlerBase,
        IHandler<CreateChannelCommand>,
        IHandler<UpdateChannelNameCommand>,
        IHandler<UpdateChannelDescriptionCommand>,
        IHandler<DeleteChannelCommand>
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
                return new CommandResult(false, "Could not create channel", Errors);
            }

            GetUserByIdQueryResult user = await _userRepository.GetById(command.AdministratorId);
            if (user is null)
            {
                AddNotification(nameof(command.AdministratorId), "User not found");
                return new CommandResult(false, "Could not create channel", Errors);
            }

            var administrator = new User(user.Id, user.Username);
            var channel = new Channel(command.Name, command.Description, administrator);
            AddNotifications(channel);

            if (Invalid)
            {
                return new CommandResult(false, "Could not create channel", Errors);
            }

            await _channelRepository.CreateChannel(channel);

            return new CommandResult(true, "Channel succesfully created", new ChannelOutput
            {
                Id = channel.Id,
                Name = channel.Name,
                Description = channel.Description,
                Administrator = new UserOutput
                {
                    Id = administrator.Id,
                    Username = administrator.Username
                }
            });
        }

        public async Task<ICommandResult> HandleAsync(UpdateChannelNameCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, "Could not update channel name", Errors);
            }

            GetChannelByIdQueryResult channel = await _channelRepository.GetById(command.Id);
            if (channel is null)
            {
                AddNotification(nameof(command.Id), "Channel not found");
                return new CommandResult(false, "Could not update channel name", Errors);
            }
            if (command.AdministratorId != channel.AdministratorId)
            {
                AddNotification(nameof(command.AdministratorId), "AdministratorId does't match channel administrator id");
                return new CommandResult(false, "User does't have permission to update channel name", Errors);
            }
            if (channel.Name != command.Name)
            {
                await _channelRepository.UpdateChannelName(command.Id, command.Name);
            }
            return new CommandResult(true, "Name successfully updated", new ChannelOutput
            {
                Id = command.Id,
                Name = command.Name
            });
        }

        public async Task<ICommandResult> HandleAsync(UpdateChannelDescriptionCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, "Could not update channel description", Errors);
            }
            GetChannelByIdQueryResult channel = await _channelRepository.GetById(command.Id);
            if (channel is null)
            {
                AddNotification(nameof(command.Id), "Channel not found");
                return new CommandResult(false, "Could not update channel description", Errors);
            }
            if (command.AdministratorId != channel.AdministratorId)
            {
                AddNotification(nameof(command.AdministratorId), "AdministratorId does't match channel administrator id");
                return new CommandResult(false, "User does't have permission to update channel description", Errors);
            }
            if (channel.Description != command.Description)
            {
                await _channelRepository.UpdateChannelDescription(command.Id, command.Description);
            }
            return new CommandResult(true, "Description successfully updated", new ChannelOutput
            {
                Id = command.Id,
                Description = command.Description
            });
        }

        public async Task<ICommandResult> HandleAsync(DeleteChannelCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, "Could not delete this channel", Errors);
            }
            GetChannelByIdQueryResult channel = await _channelRepository.GetById(command.ChannelId);
            if (channel is null)
            {
                AddNotification(nameof(command.ChannelId), "Channel not found");
                return new CommandResult(false, "Could not delete this channel", Errors);
            }
            if (channel.AdministratorId != command.AdministratorId)
            {
                AddNotification(nameof(command.AdministratorId), "AdministratorId does't match channel administrator id");
                return new CommandResult(false, "User does't have permission to delete this channel", Errors);
            }
            await _channelRepository.DeleteChannel(channel.Id);
            return new CommandResult(true, "Channel successfully deleted", null, null);
        }
    }
}
