using System;
using FluentAssertions;
using SignalRChat.Domain.Commands;
using Xunit;

namespace SignalRChat.Domain.Tests.Commands
{
    public class JoinChannelCommandTests
    {
        [Fact]
        public void ShouldReturnErrorWhenUserIdIsEmpty()
        {
            var command = new JoinChannelCommand
            {
                UserId = Guid.Empty,
                ChannelId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenChatIdIsEmpty()
        {
            var command = new JoinChannelCommand
            {
                UserId = Guid.NewGuid(),
                ChannelId = Guid.Empty
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnSuccessWhenCommandIsValid()
        {
            var command = new JoinChannelCommand
            {
                UserId = Guid.NewGuid(),
                ChannelId = Guid.NewGuid()
            };

            command.Validate();

            command.Valid.Should().BeTrue();
        }
    }
}
