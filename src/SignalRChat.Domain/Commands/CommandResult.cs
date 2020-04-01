namespace SignalRChat.Domain.Commands
{
    public class CommandResult : ICommandResult
    {
        public CommandResult(bool success, string message, object data)
        {
            Success = success;
            Message = message;
            Data = data;
        }
        public bool Success { get; }
        public string Message { get; }
        public object Data { get; }
    }
}
