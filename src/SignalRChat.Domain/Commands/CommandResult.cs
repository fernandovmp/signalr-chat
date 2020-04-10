using System.Collections.Generic;
using SignalRChat.Domain.DataOutputs;

namespace SignalRChat.Domain.Commands
{
    public class CommandResult : ICommandResult
    {
        public CommandResult(bool success, string message, object data, IEnumerable<ErrorOutput> errors)
        {
            Success = success;
            Message = message;
            Data = data;
            Errors = errors;
        }

        public CommandResult(bool success, string message, IEnumerable<ErrorOutput> errors)
            : this(success, message, null, errors)
        {
        }

        public CommandResult(bool success, string message, object data)
            : this(success, message, data, null)
        {
        }

        public bool Success { get; }
        public string Message { get; }
        public object Data { get; }

        public IEnumerable<ErrorOutput> Errors { get; }
    }
}
