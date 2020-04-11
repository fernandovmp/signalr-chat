using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Server.Models;

namespace SignalRChat.Server.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(Guid channelId, string username)
        {
            string channel = channelId.ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, channel);
            await Clients.OthersInGroup(channel).SendAsync("UserJoined", username);
        }

        public async Task SendMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}