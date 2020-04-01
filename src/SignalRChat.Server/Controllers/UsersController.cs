using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Handlers;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;
using SignalRChat.Server.Models;
using SignalRChat.Server.ViewModels;

namespace SignalRChat.Server.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            return Ok(await _userRepository.ListUsers());
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User data, [FromServices] IHandler<CreateUserCommand> createUserHandler)
        {
            var command = new CreateUserCommand
            {
                Username = data.Username
            };
            ICommandResult result = await createUserHandler.HandleAsync(command);
            if (!result.Success)
            {
                var handler = createUserHandler as CreateUserHandler;
                if (handler.Notifications.Any(notification => notification.Message == "User already exists"))
                {
                    return Conflict(new ErrorViewModel
                    {
                        Message = "User already exists",
                        Errors = handler.Notifications.Select(notification => (object)notification).ToList()
                    });
                }
                return UnprocessableEntity(new ErrorViewModel
                {
                    Message = "Could not process this user",
                    Errors = handler.Notifications.Select(notification => (object)notification).ToList()
                });
            }
            return Ok(result.Data);
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> Authenticate(User data)
        {
            GetByUsernameQueryResult user = await _userRepository.GetByUsername(data.Username);
            if (user is null)
            {
                return BadRequest(new { Error = "User not found", data.Username });
            }
            return Ok(user);
        }
    }
}