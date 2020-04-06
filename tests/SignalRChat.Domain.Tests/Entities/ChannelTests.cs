using System;
using FluentAssertions;
using SignalRChat.Domain.Entities;
using Xunit;

namespace SignalRChat.Domain.Tests.Entities
{
    public class ChannelTests
    {
        [Fact]
        public void ShouldReturnSuccessWhenChannelIsValid()
        {
            string validName = "channelOne";
            string validDescription = "The first channel";
            var validAdmnistrator = new User(Guid.NewGuid(), "default");

            var channel = new Channel(validName, validDescription, validAdmnistrator);

            channel.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnSuccessWhenDescriptionIsWhiteSpace()
        {
            string validName = "channelOne";
            string validDescription = "                ";
            var validAdmnistrator = new User(Guid.NewGuid(), "default");

            var channel = new Channel(validName, validDescription, validAdmnistrator);

            channel.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameIsNull()
        {
            string name = null;
            string validDescription = "The first channel";
            var validAdmnistrator = new User(Guid.NewGuid(), "default");

            var channel = new Channel(name, validDescription, validAdmnistrator);

            channel.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameIsWhiteSpaces()
        {
            string name = "         ";
            string validDescription = "The first channel";
            var validAdmnistrator = new User(Guid.NewGuid(), "default");

            var channel = new Channel(name, validDescription, validAdmnistrator);

            channel.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenNameLenghtIsGreaterThan32()
        {
            string name = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI";
            string validDescription = "The first channel";
            var validAdmnistrator = new User(Guid.NewGuid(), "default");

            var channel = new Channel(name, validDescription, validAdmnistrator);

            channel.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenDescriptionLenghtIsGreaterThan100()
        {
            string validName = "channelOne";
            string description = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI";
            var validAdmnistrator = new User(Guid.NewGuid(), "default");

            var channel = new Channel(validName, description, validAdmnistrator);

            channel.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenAdministratorIsInvalid()
        {
            string validName = "channelOne";
            string validDescription = "The first channel";
            var admnistrator = new User(Guid.NewGuid(), "          ");

            var channel = new Channel(validName, validDescription, admnistrator);

            channel.Invalid.Should().BeTrue();
        }
    }
}
