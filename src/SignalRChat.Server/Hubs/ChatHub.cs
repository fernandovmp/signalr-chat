using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Server.Models;

namespace SignalRChat.Server.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(string username)
        {
            await Clients.Others.SendAsync("UserJoined", username);
        }

        public async Task SendMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}