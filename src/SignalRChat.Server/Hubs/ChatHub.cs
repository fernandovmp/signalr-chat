using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;
using SignalRChat.Server.Models;
using SignalRChat.Server.ViewModels;

namespace SignalRChat.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IUserRepository _userRepository;
        private readonly IChannelRepository _channelRepository;

        public ChatHub(IUserRepository userRepository, IChannelRepository channelRepository)
        {
            _userRepository = userRepository;
            _channelRepository = channelRepository;
        }

        public async Task JoinChat(Guid channelId, string username)
        {
            string channel = channelId.ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, channel);
            await Clients.OthersInGroup(channel).SendAsync("UserJoined", username);
        }

        public async Task LeaveChat(Guid channelId, string username)
        {
            string channel = channelId.ToString();
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channel);
            await Clients.Group(channel).SendAsync("UserLeave", username);
        }
        public async Task SendMessage(SendMessageViewModel message)
        {
            GetChannelByIdQueryResult channel = await _channelRepository.GetById(message.ChannelId);
            if (channel is null) return;
            GetUserByIdQueryResult user = await _userRepository.GetById(message.SenderId);
            if (user is null) return;
            var finalMessage = new Message
            {
                Content = message.Content,
                Date = message.Date,
                ChannelId = message.ChannelId,
                Sender = new User
                {
                    Id = user.Id,
                    Username = user.Username
                }
            };
            await Clients.Group(message.ChannelId.ToString()).SendAsync("ReceiveMessage", finalMessage);
        }
    }
}
