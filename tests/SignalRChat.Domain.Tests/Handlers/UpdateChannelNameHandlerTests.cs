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
    public class UpdateChannelNameHandlerTests
    {

        [Fact]
        public async Task ShouldReturnErrorWhenNameIsWhiteSpace()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var command = new UpdateChannelNameCommand
            {
                Id = Guid.NewGuid(),
                Name = "              ",
                AdministratorId = Guid.NewGuid()
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }

        [Fact]
        public async Task ShouldReturnErrorWhenNameIsNull()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var command = new UpdateChannelNameCommand
            {
                Id = Guid.NewGuid(),
                Name = null,
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
            var command = new UpdateChannelNameCommand
            {
                Id = Guid.NewGuid(),
                Name = "default",
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
            string channelName = "channelOne";
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Name = channelName,
                    AdministratorId = adminstratorId
                });
            var command = new UpdateChannelNameCommand
            {
                Id = channelId,
                Name = channelName,
                AdministratorId = commandAdministratorId
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }

        [Fact]
        public async Task ShouldReturnSuccessWhenNamesAreEqual()
        {
            Guid channelId = Guid.NewGuid();
            Guid adminstratorId = Guid.NewGuid();
            string channelName = "channelOne";
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Name = channelName,
                    AdministratorId = adminstratorId
                });
            var command = new UpdateChannelNameCommand
            {
                Id = channelId,
                Name = channelName,
                AdministratorId = adminstratorId
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);
            var resultOutput = result.Data as ChannelOutput;

            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            resultOutput.Should().NotBeNull();
            resultOutput?.Name.Should().Be(command.Name);
            handler.Valid.Should().BeTrue();
            fakeChannelRepository.Verify(
                repository => repository.UpdateChannelName(It.IsAny<Guid>(), It.IsAny<string>()),
                Times.Never());
        }
        [Fact]
        public async Task ShouldReturnSuccessWhenNamesAreNotEqual()
        {
            Guid channelId = Guid.NewGuid();
            Guid adminstratorId = Guid.NewGuid();
            string channelName = "newer name";
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Name = "older name",
                    AdministratorId = adminstratorId
                });
            var command = new UpdateChannelNameCommand
            {
                Id = channelId,
                Name = channelName,
                AdministratorId = adminstratorId
            };
            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);
            var resultOutput = result.Data as ChannelOutput;

            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            resultOutput.Should().NotBeNull();
            resultOutput?.Name.Should().Be(command.Name);
            handler.Valid.Should().BeTrue();
            fakeChannelRepository.Verify(
                repository => repository.UpdateChannelName(It.IsAny<Guid>(), It.IsAny<string>()),
                Times.Once());
        }
    }
}
