using Microsoft.Extensions.DependencyInjection;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Handlers;
using SignalRChat.Domain.Repositories;
using SignalRChat.Infrastructure.Data.Repositories;

namespace SignalRChat.Server.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            return services.AddScoped<IUserRepository, UserRepository>();
        }

        public static IServiceCollection AddCommandHandlers(this IServiceCollection services)
        {
            return services.AddScoped<IHandler<CreateUserCommand>, CreateUserHandler>();
        }
    }
}
