using FluentAssertions;
using SignalRChat.Domain.Commands;
using Xunit;

namespace SignalRChat.Domain.Tests.Commands
{
    public class CreateUserCommandTests
    {
        [Fact]
        public void ShouldReturnSuccessWhenUsernameIsValid()
        {
            var command = new CreateUserCommand
            {
                Username = "defaultUsername"
            };

            command.Validate();

            command.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenUsernameIsNull()
        {
            var command = new CreateUserCommand
            {
                Username = null
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenUsernameIsWhiteSpace()
        {
            var command = new CreateUserCommand
            {
                Username = "                       "
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenUsernameLenghtIsGreaterThan32()
        {
            var command = new CreateUserCommand
            {
                Username = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI"
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
    }
}