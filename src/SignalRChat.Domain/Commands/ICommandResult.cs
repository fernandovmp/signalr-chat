using System.Collections.Generic;
using SignalRChat.Domain.DataOutputs;

namespace SignalRChat.Domain.Commands
{
    public interface ICommandResult
    {
        bool Success { get; }
        string Message { get; }
        object Data { get; }
        IEnumerable<ErrorOutput> Errors { get; }
    }
}
