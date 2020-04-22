using System;

namespace SignalRChat.Server.Models
{
    public class Message
    {
        public User Sender { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public Guid ChannelId { get; set; }
    }
}
