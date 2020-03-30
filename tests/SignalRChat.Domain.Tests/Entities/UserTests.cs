using FluentAssertions;
using SignalRChat.Domain.Entities;
using Xunit;

namespace SignalRChat.Domain.Tests.Entities
{
    public class UserTests
    {
        [Fact]
        public void ShouldReturnSuccessWhenUsernameIsValid()
        {
            string username = "defaultUsername";

            var user = new User(username);

            user.Valid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenUsernameIsNull()
        {
            string username = null;

            var user = new User(username);

            user.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenUsernameIsWhiteSpace()
        {
            string username = "                       ";

            var user = new User(username);

            user.Invalid.Should().BeTrue();
        }
        [Fact]
        public void ShouldReturnErrorWhenUsernameLenghtIsGreaterThan32()
        {
            string username = "PS15TihJoUQEydtvAZFa5SeaHcDNdosgagsPHrLI";

            var user = new User(username);

            user.Invalid.Should().BeTrue();
        }
    }
}