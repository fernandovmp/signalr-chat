using System;

namespace SignalRChat.Domain.DataOutputs
{
    public class ChannelOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
