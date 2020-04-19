using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Domain.Commands;
using SignalRChat.Domain.Handlers;
using SignalRChat.Domain.Queries;
using SignalRChat.Domain.Repositories;
using SignalRChat.Server.ViewModels;

namespace SignalRChat.Server.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class ChatsController : ControllerBase
    {
        private readonly IChatRepository _chatRepository;
        public ChatsController(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListChannelsQueryResult>>> ListChannels(
            [FromHeader] Guid authorization)
        {
            return Ok(await _chatRepository.ListUserChats(authorization));
        }

        [HttpPost]
        public async Task<ActionResult> JoinChannel(JoinChatViewModel joinChatViewModel,
            [FromHeader] Guid authorization,
            [FromServices] IHandler<JoinChannelCommand> handler)
        {
            var command = new JoinChannelCommand
            {
                UserId = authorization,
                ChannelId = joinChatViewModel.ChannelId
            };
            ICommandResult result = await handler.HandleAsync(command);
            if (!result.Success)
            {
                return BadRequest(new ErrorViewModel(result));
            }
            return NoContent();
        }
    }
}
