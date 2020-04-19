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
    public class ChannelHandlerTests
    {
        #region MemberData
        public static IEnumerable<object[]> GetValidCommands()
        {
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "channelOne",
                    Description = "The first channel",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "channelOne",
                    Description = "                ",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "PS15TihJoUQEydtvAZFa5SeaHc",
                    Description = "PS15TihJoUQEydtvAZFa5SeaHcPS15TihJoUQEydtvAZFa5SeaHc",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "a",
                    Description = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJo",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "a",
                    Description = "",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "a",
                    Description = null,
                    AdministratorId = Guid.NewGuid()
                }
            };
        }
        public static IEnumerable<object[]> GetInvalidCommands()
        {
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = null,
                    Description = "The first channel",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "           ",
                    Description = "The first channel",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI",
                    Description = "The first channel",
                    AdministratorId = Guid.NewGuid()
                }
            };
            yield return new[]
            {
                new CreateChannelCommand
                {
                    Name = "channelOne",
                    Description = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLIPS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI",
                    AdministratorId = Guid.NewGuid()
                }
            };
        }
        #endregion

        [Fact]
        public async Task ShouldReturnErrorWhenAdministratorNotExists()
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            fakeUserRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .Returns(Task.FromResult<GetUserByIdQueryResult>(null));
            var fakeChannelRepository = new Mock<IChannelRepository>();
            var command = new CreateChannelCommand
            {
                Name = "channelOne",
                Description = "The first channel",
                AdministratorId = Guid.NewGuid()
            };

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            result.Success.Should().BeFalse();
            result.Errors.Should().HaveCountGreaterThan(0);
            handler.Invalid.Should().BeTrue();
        }

        [Fact]
        public async Task ShouldReturnSuccessWhenAdministratorExists()
        {
            Guid administratorId = Guid.Parse("fecd358a-5098-49bf-b26a-3a366a6da6f2");
            var fakeUserRepository = new Mock<IUserRepository>();
            fakeUserRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) =>
                {
                    if (id != administratorId) return null;
                    return new GetUserByIdQueryResult
                    {
                        Id = administratorId,
                        Username = "default"
                    };
                });
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.CreateChannel(It.IsAny<Channel>()));

            var command = new CreateChannelCommand
            {
                Name = "channelOne",
                Description = "The first channel",
                AdministratorId = administratorId
            };

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);
            var resultOutput = result.Data as ChannelOutput;

            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Errors.Should().BeNullOrEmpty();
            resultOutput.Should().NotBeNull();
            resultOutput?.Id.Should().NotBeEmpty();
            resultOutput?.Administrator.Should().NotBeNull();
            resultOutput?.Administrator?.Id.Should().Be(administratorId);
            handler.Valid.Should().BeTrue();
            fakeChannelRepository.Verify(
                repository => repository.CreateChannel(It.IsAny<Channel>()),
                Times.Once());
        }

        [Theory]
        [MemberData(nameof(GetInvalidCommands))]
        public async Task ShouldReturnErrorWhenCommandIsInvalid(CreateChannelCommand command)
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            var fakeChannelRepository = new Mock<IChannelRepository>();

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);

            handler.Invalid.Should().BeTrue();
            result.Success.Should().BeFalse();
            result.Errors.Should().HaveCountGreaterThan(0);
        }

        [Theory]
        [MemberData(nameof(GetValidCommands))]
        public async Task ShouldReturnSuccessWhenCommandIsValid(CreateChannelCommand command)
        {
            var fakeUserRepository = new Mock<IUserRepository>();
            fakeUserRepository
                .Setup(repository => repository.GetById(It.IsAny<Guid>()))
                .ReturnsAsync((Guid id) => new GetUserByIdQueryResult
                {
                    Id = id,
                    Username = "default"
                });
            var fakeChannelRepository = new Mock<IChannelRepository>();
            fakeChannelRepository
                .Setup(repository => repository.CreateChannel(It.IsAny<Channel>()));

            var handler = new ChannelHandler(fakeChannelRepository.Object, fakeUserRepository.Object);

            ICommandResult result = await handler.HandleAsync(command);
            var resultOutput = result.Data as ChannelOutput;

            handler.Valid.Should().BeTrue();
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Errors.Should().BeNullOrEmpty();
            resultOutput.Should().NotBeNull();
            resultOutput?.Id.Should().NotBeEmpty();
            resultOutput?.Administrator.Should().NotBeNull();
            resultOutput?.Administrator?.Id.Should().Be(command.AdministratorId);
            fakeChannelRepository.Verify(
                repository => repository.CreateChannel(It.IsAny<Channel>()),
                Times.Once());
            fakeChannelRepository.Verify(
                repository => repository.AddUserToChannel(
                    It.Is<Guid>(id => id == command.AdministratorId),
                    It.Is<Guid>(id => id == resultOutput.Id),
                    It.Is<bool>(isAdministrator => isAdministrator == true)));
        }
    }
}
