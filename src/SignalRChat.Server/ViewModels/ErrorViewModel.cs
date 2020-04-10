using System.Collections.Generic;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.DataOutputs;

namespace SignalRChat.Server.ViewModels
{
    public class ErrorViewModel
    {
        public ErrorViewModel(string message, IEnumerable<ErrorOutput> errors)
        {
            Message = message;
            Errors = errors;
        }
        public ErrorViewModel(ICommandResult result) : this(result.Message, result.Errors)
        {
        }
        public string Message { get; }
        public IEnumerable<ErrorOutput> Errors { get; }
    }
}
