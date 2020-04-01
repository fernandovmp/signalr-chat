namespace SignalRChat.Domain.Commands
{
    public interface ICommandResult
    {
        bool Success { get; }
        string Message { get; }
        object Data { get; }
    }
}