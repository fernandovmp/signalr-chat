using System.Threading.Tasks;
using SignalRChat.Domain.Commands;

namespace SignalRChat.Domain.Handlers
{
    public interface IHandler<T> where T : ICommand
    {
        Task<ICommandResult> HandleAsync(T command);
    }
}