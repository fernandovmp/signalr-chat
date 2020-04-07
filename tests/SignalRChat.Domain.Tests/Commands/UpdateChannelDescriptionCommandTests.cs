using System;
using FluentAssertions;
using SignalRChat.Domain.Commands;
using Xunit;

namespace SignalRChat.Domain.Tests.Commands
{
    public class UpdateChannelDescriptionCommandTests
    {
        [Fact]
        public void ShouldReturnSuccessWhenCommandIsValid()
        {
            var command = new UpdateChannelDescriptionCommand
            {
                Id = Guid.NewGuid(),
                Description = "The first channel",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenDescriptionLenghtIsGreaterThan100()
        {
            var command = new UpdateChannelDescriptionCommand
            {
                Id = Guid.NewGuid(),
                Description = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
    }
}
