using System;
using FluentAssertions;
using SignalRChat.Domain.Commands;
using Xunit;

namespace SignalRChat.Domain.Tests.Commands
{
    public class UpdateChannelNameCommandTests
    {
        [Fact]
        public void ShouldReturnSuccessWhenCommandIsValid()
        {
            var command = new UpdateChannelNameCommand
            {
                Id = Guid.NewGuid(),
                Name = "channelTwo",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameIsWhiteSpaces()
        {
            var command = new UpdateChannelNameCommand
            {
                Id = Guid.NewGuid(),
                Name = "           ",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameIsNull()
        {
            var command = new UpdateChannelNameCommand
            {
                Id = Guid.NewGuid(),
                Name = null,
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameLenghtIsGreaterThan32()
        {
            var command = new UpdateChannelNameCommand
            {
                Id = Guid.NewGuid(),
                Name = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
    }
}
