using System;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Handlers;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;
using Xunit;

namespace SignalRChat.Domain.Tests.Handlers
{
    public class DeleteChannelHandlerTests
    {
        [Fact]
        public async Task ShouldReturnErrorWhenChannelIdIsEmpty()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.Empty,
                AdministratorId = Guid.NewGuid()
            };

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }
        [Fact]
        public async Task ShouldReturnErrorWhenAdministratorIdIsEmpty()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.NewGuid(),
                AdministratorId = Guid.Empty
            };

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }
        [Fact]
        public async Task ShouldReturnErrorWhenChannelIdAndAdministratorIdIsEmpty()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.Empty,
                AdministratorId = Guid.Empty
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
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.NewGuid(),
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
            Guid adminstratorId = Guid.NewGuid();
            Guid commandAdministratorId = Guid.NewGuid();
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = id,
                    Name = "channelOne",
                    Description = "The first channel",
                    AdministratorId = adminstratorId
                });
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.NewGuid(),
                AdministratorId = commandAdministratorId
            };

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            handler.Invalid.Should().BeTrue();
        }
        [Fact]
        public async Task ShouldReturnSuccessWhenCommandIsValid()
        {
            Guid administratorId = Guid.NewGuid();
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetChannelByIdQueryResult
                {
                    Id = id,
                    Name = "channelOne",
                    Description = "The first channel",
                    AdministratorId = administratorId
                });
            var command = new DeleteChannelCommand
            {
                ChannelId = Guid.NewGuid(),
                AdministratorId = administratorId
            };

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeTrue();
            handler.Valid.Should().BeTrue();
            fakeChannelRepository.Verify(
                repository => repository.DeleteChannel(It.IsAny<Guid>()),
                Times.Once());
        }
    }
}
