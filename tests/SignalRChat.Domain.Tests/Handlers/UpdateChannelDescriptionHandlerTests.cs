using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.DataOutputs;
using SignalRChat.Domain.Entities;
using SignalRChat.Domain.Handlers;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;
using Xunit;

namespace SignalRChat.Domain.Tests.Handlers
{
    public class UpdateChannelDescriptionHandlerTests
    {

        [Fact]
        public async Task ShouldReturnErrorWhenDescriptionLenghtIsGreaterThan100()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var command = new UpdateChannelDescriptionCommand
            {
                Id = Guid.NewGuid(),
                Description = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI",
                AdministratorId = Guid.NewGuid()
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }
        [Fact]
        public async Task ShouldReturnErrorWhenChannelNotFound()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .Returns(Task.FromResult<GetChannelByIdQueryResult>(null));
            var command = new UpdateChannelDescriptionCommand
            {
                Id = Guid.NewGuid(),
                Description = "The first channel",
                AdministratorId = Guid.NewGuid()
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }
        [Fact]
        public async Task ShouldReturnErrorWhenAdministratorIdDoesNotMatch()
        {
            Guid channelId = Guid.NewGuid();
            Guid adminstratorId = Guid.NewGuid();
            Guid commandAdministratorId = Guid.NewGuid();
            string channelDescription = "The first channel";
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Description = channelDescription,
                    AdministratorId = adminstratorId
                });
            var command = new UpdateChannelDescriptionCommand
            {
                Id = channelId,
                Description = channelDescription,
                AdministratorId = commandAdministratorId
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }

        [Fact]
        public async Task ShouldReturnSuccessWhenDescriptionsAreEqual()
        {
            Guid channelId = Guid.NewGuid();
            Guid adminstratorId = Guid.NewGuid();
            string channelDescription = "The first channel";
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Description = channelDescription,
                    AdministratorId = adminstratorId
                });
            var command = new UpdateChannelDescriptionCommand
            {
                Id = channelId,
                Description = channelDescription,
                AdministratorId = adminstratorId
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);
            var resultOutput = result.Data as ChannelOutput;

            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            resultOutput.Should().NotBeNull();
            resultOutput?.Description.Should().Be(command.Description);
            handler.Valid.Should().BeTrue();
            fakeChannelRepository.Verify(
                repository => repository.UpdateChannelDescription(It.IsAny<Guid>(), It.IsAny<string>()),
                Times.Never());
        }
        [Fact]
        public async Task ShouldReturnSuccessWhenDescriptionsAreNotEqual()
        {
            Guid channelId = Guid.NewGuid();
            Guid adminstratorId = Guid.NewGuid();
            string channelDescription = "newer description";
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Description = "older description",
                    AdministratorId = adminstratorId
                });
            var command = new UpdateChannelDescriptionCommand
            {
                Id = channelId,
                Description = channelDescription,
                AdministratorId = adminstratorId
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);
            var resultOutput = result.Data as ChannelOutput;

            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            resultOutput.Should().NotBeNull();
            resultOutput?.Description.Should().Be(command.Description);
            handler.Valid.Should().BeTrue();
            fakeChannelRepository.Verify(
                repository => repository.UpdateChannelDescription(It.IsAny<Guid>(), It.IsAny<string>()),
                Times.Once());
        }
    }
}
