using System;

namespace SignalRChat.Server.ViewModels
{
    public class SendMessageViewModel
    {
        public Guid SenderId { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public Guid ChannelId { get; set; }
    }
}
