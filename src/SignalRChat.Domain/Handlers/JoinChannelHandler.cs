using System.Threading.Tasks;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;

namespace SignalRChat.Domain.Handlers
{
    public class JoinChannelHandler : HandlerBase, IHandler<JoinChannelCommand>
    {
        private readonly IChannelRepository _channelRepository;
        private readonly IUserRepository _userRepository;
        public JoinChannelHandler(IChannelRepository channelRepository,
            IUserRepository userRepository)
        {
            _channelRepository = channelRepository;
            _userRepository = userRepository;
        }
        public async Task<ICommandResult> HandleAsync(JoinChannelCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, "User could not join this channel", Errors);
            }
            GetUserByIdQueryResult user = await _userRepository.GetById(command.UserId);
            if (user is null)
            {
                AddNotification(nameof(command.UserId), "User not found");
                return new CommandResult(false, "User not found", Errors);
            }
            GetChannelByIdQueryResult channel = await _channelRepository.GetById(command.ChannelId);
            if (channel is null)
            {
                AddNotification(nameof(command.ChannelId), "Channel not found");
                return new CommandResult(false, "Channel not found", Errors);
            }
            bool userAlreadyIsMemeber = await _channelRepository.UserIsMemberOfChannel(user.Id, channel.Id);
            if (userAlreadyIsMemeber)
            {
                AddNotification(nameof(command.ChannelId), "User already is member of this channel");
                return new CommandResult(false, "User could not join this channel", Errors);
            }
            await _channelRepository.AddUserToChannel(user.Id, channel.Id, false);
            return new CommandResult(true, "User successfully joined the channel", data: null);
        }
    }
}
