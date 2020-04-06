using System;
using FluentAssertions;
using SignalRChat.Domain.Commands;
using Xunit;

namespace SignalRChat.Domain.Tests.Commands
{
    public class CreateChannelCommandTests
    {
        [Fact]
        public void ShouldReturnSuccessWhenCommandIsValid()
        {
            var command = new CreateChannelCommand
            {
                Name = "channelOne",
                Description = "The first channel",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnSuccessWhenDescriptionIsWhiteSpace()
        {
            var command = new CreateChannelCommand
            {
                Name = "channelOne",
                Description = "                ",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameIsNull()
        {
            var command = new CreateChannelCommand
            {
                Name = null,
                Description = "The first channel",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameIsWhiteSpaces()
        {
            var command = new CreateChannelCommand
            {
                Name = "           ",
                Description = "The first channel",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameLenghtIsGreaterThan32()
        {
            var command = new CreateChannelCommand
            {
                Name = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI",
                Description = "The first channel",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenDescriptionLenghtIsGreaterThan100()
        {
            var command = new CreateChannelCommand
            {
                Name = "channelOne",
                Description = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI",
                AdministratorId = Guid.NewGuid()
            };

            command.Validate();

            command.Invalid.Should().BeTrue();
        }
    }
}
