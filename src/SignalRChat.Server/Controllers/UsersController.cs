using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Server.Models;
using SignalRChat.Server.Repositories;

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
            return Ok(await _userRepository.GetAll());
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User data)
        {
            if (await _userRepository.Exists(data.Username))
            {
                return Conflict(new
                {
                    Message = "User already exists"
                });
            }

            if (data.Username.Length > 32)
            {
                return UnprocessableEntity(new
                {
                    Error = "username should be at maximum 32 characters"
                });
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = data.Username
            };
            await _userRepository.CreateUser(user);
            return Ok(user);
        }
    }
}