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
    public class JoinChannelHandlerTests
    {
        [Fact]
        public async Task ShouldReturnErrorWhenUserIdIsEmpty()
        {
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var fakeUserRepository = new Mock<IUserRepository>();
            var command = new JoinChannelCommand
            {
                UserId = Guid.Empty,
                ChannelId = Guid.NewGuid()
            };
            var handler = new JoinChannelHandler(fakeChannelRepository.Object,
                fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            result.Errors.Should().HaveCountGreaterThan(0);
            handler.Invalid.Should().BeTrue();
        }
        [Fact]
        public async Task ShouldReturnErrorWhenChatIdIsEmpty()
        {
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var fakeUserRepository = new Mock<IUserRepository>();
            var command = new JoinChannelCommand
            {
                UserId = Guid.NewGuid(),
                ChannelId = Guid.Empty
            };
            var handler = new JoinChannelHandler(fakeChannelRepository.Object,
                fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            result.Errors.Should().HaveCountGreaterThan(0);
            handler.Invalid.Should().BeTrue();
        }

        [Fact]
        public async Task ShouldReturnErrorWhenUserNotFound()
        {
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var fakeUserRepository = new Mock<IUserRepository>();
            fakeUserRepository
                .Setup(fake => fake.GetById(It.IsAny<Guid>()))
                .Returns(Task.FromResult<GetUserByIdQueryResult>(null));
            var command = new JoinChannelCommand
            {
                UserId = Guid.NewGuid(),
                ChannelId = Guid.NewGuid()
            };
            var handler = new JoinChannelHandler(fakeChannelRepository.Object,
                fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            result.Errors.Should().HaveCountGreaterThan(0);
            handler.Invalid.Should().BeTrue();
            command.Valid.Should().BeTrue();
            fakeUserRepository.Verify(fake => fake.GetById(It.Is<Guid>(id => id == command.UserId)),
                Times.Once());
        }
        [Fact]
        public async Task ShouldReturnErrorWhenChannelNotFound()
        {
            Guid userId = Guid.NewGuid();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(fake => fake.GetById(It.IsAny<Guid>()))
                .Returns(Task.FromResult<GetChannelByIdQueryResult>(null));
            var fakeUserRepository = new Mock<IUserRepository>();
            fakeUserRepository
                .Setup(fake => fake.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(new GetUserByIdQueryResult
                {
                    Id = userId,
                    Username = "default"
                });
            var command = new JoinChannelCommand
            {
                UserId = userId,
                ChannelId = Guid.NewGuid()
            };
            var handler = new JoinChannelHandler(fakeChannelRepository.Object,
                fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            result.Errors.Should().HaveCountGreaterThan(0);
            handler.Invalid.Should().BeTrue();
            command.Valid.Should().BeTrue();
            fakeUserRepository.Verify(fake => fake.GetById(It.Is<Guid>(id => id == command.UserId)),
                Times.Once());
            fakeChannelRepository.Verify(fake => fake.GetById(It.Is<Guid>(id => id == command.ChannelId)),
                Times.Once());
        }

        [Fact]
        public async Task ShouldReturnErrorWhenUserAlreadyIsMemberOfChannel()
        {
            Guid userId = Guid.NewGuid();
            Guid channelId = Guid.NewGuid();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(fake => fake.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Name = "channel one"
                });
            fakeChannelRepository.Setup(fake => fake.UserIsMemberOfChannel(It.IsAny<Guid>(), It.IsAny<Guid>()))
                .ReturnsAsync(true);
            var fakeUserRepository = new Mock<IUserRepository>();
            fakeUserRepository
                .Setup(fake => fake.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(new GetUserByIdQueryResult
                {
                    Id = userId,
                    Username = "default"
                });
            var command = new JoinChannelCommand
            {
                UserId = userId,
                ChannelId = channelId
            };
            var handler = new JoinChannelHandler(fakeChannelRepository.Object,
                fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            result.Errors.Should().HaveCountGreaterThan(0);
            handler.Invalid.Should().BeTrue();
            command.Valid.Should().BeTrue();
            fakeUserRepository.Verify(fake => fake.GetById(It.Is<Guid>(id => id == command.UserId)),
                Times.Once());
            fakeChannelRepository.Verify(fake => fake.GetById(It.Is<Guid>(id => id == command.ChannelId)),
                Times.Once());
            fakeChannelRepository.Verify(
                fake => fake.UserIsMemberOfChannel(It.Is<Guid>(id => id == userId), It.Is<Guid>(id => id == channelId)),
                Times.Once());
        }

        [Fact]
        public async Task ShouldReturnSuccessWhenUserIsNotMemberOfChannel()
        {
            Guid userId = Guid.NewGuid();
            Guid channelId = Guid.NewGuid();
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(fake => fake.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(new GetChannelByIdQueryResult
                {
                    Id = channelId,
                    Name = "channel one"
                });
            fakeChannelRepository.Setup(fake => fake.UserIsMemberOfChannel(It.IsAny<Guid>(), It.IsAny<Guid>()))
                .ReturnsAsync(false);
            var fakeUserRepository = new Mock<IUserRepository>();
            fakeUserRepository
                .Setup(fake => fake.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(new GetUserByIdQueryResult
                {
                    Id = userId,
                    Username = "default"
                });
            var command = new JoinChannelCommand
            {
                UserId = userId,
                ChannelId = channelId
            };
            var handler = new JoinChannelHandler(fakeChannelRepository.Object,
                fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeTrue();
            result.Errors.Should().BeNull();
            handler.Valid.Should().BeTrue();
            command.Valid.Should().BeTrue();
            fakeUserRepository.Verify(fake => fake.GetById(It.Is<Guid>(id => id == command.UserId)),
                Times.Once());
            fakeChannelRepository.Verify(fake => fake.GetById(It.Is<Guid>(id => id == command.ChannelId)),
                Times.Once());
            fakeChannelRepository.Verify(
                fake => fake.UserIsMemberOfChannel(It.Is<Guid>(id => id == userId), It.Is<Guid>(id => id == channelId)),
                Times.Once());
            fakeChannelRepository.Verify(
                fake => fake.AddUserToChannel(
                    It.Is<Guid>(id => id == userId),
                    It.Is<Guid>(id => id == channelId),
                    It.Is<bool>(isAdministrator => isAdministrator == false)),
                Times.Once());
        }
    }
}
