using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Handlers;
using SignalRChat.Domain.Repositories;
using Xunit;

namespace SignalRChat.Domain.Tests.Handlers
{
    public class CreateUserHandlerTests
    {
        #region MemberData
        public static IEnumerable<object[]> GetInvalidCommands()
        {
            yield return new[]
            {
                new CreateUserCommand
                {
                    Username = null
                }
            };
            yield return new CreateUserCommand[]
            {
                new CreateUserCommand
                {
                    Username = ""
                }
            };
            yield return new CreateUserCommand[]
            {
                new CreateUserCommand
                {
                    Username = "        "
                }
            };
            yield return new CreateUserCommand[]
            {
                new CreateUserCommand
                {
                    Username = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI"
                }
            };
        }

        public static IEnumerable<object[]> GetValidCommands()
        {
            yield return new[]
            {
                new CreateUserCommand
                {
                    Username = "defaultUsername"
                }
            };
            yield return new CreateUserCommand[]
            {
                new CreateUserCommand
                {
                    Username = "a"
                }
            };
            yield return new CreateUserCommand[]
            {
                new CreateUserCommand
                {
                    Username = "PS15TihJoUQEydtvAZFa5SeaHcDNdoas"
                }
            };
        }
        #endregion

        [Fact]
        public async Task ShouldReturnErrorWhenUsernameAlreadyExists()
        {
            var fakeRepository = new Mock<IUserRepository>();
            fakeRepository
                .Setup(repository => repository.Exists(It.IsAny<string>()))
                .ReturnsAsync(true);
            var handler = new CreateUserHandler(fakeRepository.Object);
            var command = new CreateUserCommand
            {
                Username = "defaultUsername"
            };

            ICommandResult result = await handler.HandleAsync(command);
            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }

        [Theory]
        [MemberData(nameof(GetInvalidCommands))]
        public async Task ShouldReturnErrorWhenCommandIsInvalid(CreateUserCommand command)
        {
            var fakeRepository = new Mock<IUserRepository>();
            fakeRepository
                .Setup(repository => repository.Exists(It.IsAny<string>()))
                .ReturnsAsync(false);

            var handler = new CreateUserHandler(fakeRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);
            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }

        [Theory]
        [MemberData(nameof(GetValidCommands))]
        public async Task ShouldReturnSuccessWhenCommandIsValid(CreateUserCommand command)
        {
            var fakeRepository = new Mock<IUserRepository>();
            fakeRepository
                .Setup(repository => repository.Exists(It.IsAny<string>()))
                .ReturnsAsync(false);

            var handler = new CreateUserHandler(fakeRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Should().BeOfType(typeof(CreateUserCommandResult));
            result.Success.Should().BeTrue();
            handler.Valid.Should().BeTrue();
        }
    }
}