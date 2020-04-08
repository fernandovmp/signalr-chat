using System;
using FluentAssertions;
using SignalRChat.Domain.Commands;
using Xunit;

namespace SignalRChat.Domain.Tests.Commands
{
    public class DeleteChannelCommandTests
    {
        [Fact]
        public void ShouldReturnErrorWhenChannelIdIsEmpty()
        {
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.Empty,
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenAdministratorIdIsEmpty()
        {
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.NewGuid(),
                AdministratorId = Guid.Empty
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenChannelIdAndAdministratorIdIsEmpty()
        {
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.Empty,
                AdministratorId = Guid.Empty
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnSuccessWhenChannelIdAndAdministratorIdIsValid()
        {
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.NewGuid(),
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Valid.Should().BeTrue();
        }
    }
}
