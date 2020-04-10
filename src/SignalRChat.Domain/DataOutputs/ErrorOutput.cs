namespace SignalRChat.Domain.DataOutputs
{
    public class ErrorOutput
    {
        public ErrorOutput(string property, string message)
        {
            Property = property;
            Message = message;
        }
        public string Property { get; }
        public string Message { get; }
    }
}
