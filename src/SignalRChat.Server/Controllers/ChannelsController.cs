using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ChannelsController : ControllerBase
    {
        private readonly IChannelRepository _channelRepository;
        public ChannelsController(IChannelRepository channelRepository)
        {
            _channelRepository = channelRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListChannelsQueryResult>>> ListChannels()
        {
            return Ok(await _channelRepository.ListChannels());
        }

        [HttpPost]
        public async Task<ActionResult> CreateChannel(ChannelPostViewModel data,
            [FromHeader] Guid authorization,
            [FromServices] IHandler<CreateChannelCommand> handler)
        {
            var command = new CreateChannelCommand
            {
                Name = data.Name,
                Description = data.Description,
                AdministratorId = authorization
            };
            ICommandResult result = await handler.HandleAsync(command);
            if (!result.Success)
            {
                var channelHandler = handler as ChannelHandler;
                return BadRequest(new ErrorViewModel
                {
                    Message = result.Message,
                    Errors = channelHandler.Notifications.Select(notification => (object)notification).ToList()
                });
            }
            return Ok(result.Data);
        }

        [HttpPut("{id}/name")]
        public async Task<ActionResult> UpdateChannelName(UpdateChannelNameViewModel data,
            [FromRoute] Guid id,
            [FromHeader] Guid authorization,
            [FromServices] IHandler<UpdateChannelNameCommand> handler)
        {
            var command = new UpdateChannelNameCommand
            {
                Id = id,
                Name = data.Name,
                AdministratorId = authorization
            };
            ICommandResult result = await handler.HandleAsync(command);
            if (!result.Success)
            {
                var channelHandler = handler as ChannelHandler;
                return BadRequest(new ErrorViewModel
                {
                    Message = result.Message,
                    Errors = channelHandler.Notifications.Select(notification => (object)notification).ToList()
                });
            }
            return NoContent();
        }

        [HttpPut("{id}/description")]
        public async Task<ActionResult> UpdateChannelDescription(UpdateChannelDescriptionViewModel data,
            [FromRoute] Guid id,
            [FromHeader] Guid authorization,
            [FromServices] IHandler<UpdateChannelDescriptionCommand> handler)
        {
            var command = new UpdateChannelDescriptionCommand
            {
                Id = id,
                Description = data.Description,
                AdministratorId = authorization
            };
            ICommandResult result = await handler.HandleAsync(command);
            if (!result.Success)
            {
                var channelHandler = handler as ChannelHandler;
                return BadRequest(new ErrorViewModel
                {
                    Message = result.Message,
                    Errors = channelHandler.Notifications.Select(notification => (object)notification).ToList()
                });
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteChannel([FromRoute] Guid id,
            [FromHeader] Guid authorization,
            [FromServices] IHandler<DeleteChannelCommand> handler)
        {
            var command = new DeleteChannelCommand
            {
                ChannelId = id,
                AdministratorId = authorization
            };
            ICommandResult result = await handler.HandleAsync(command);
            if (!result.Success)
            {
                var channelHandler = handler as ChannelHandler;
                if (channelHandler.Notifications.Any(notification => notification.Message == "Channel not found"))
                {
                    return NotFound(new ErrorViewModel
                    {
                        Message = result.Message,
                        Errors = channelHandler.Notifications.Select(notification => (object)notification).ToList()
                    });
                }
                if (channelHandler.Notifications
                    .Any(notification => notification.Message == "AdministratorId does't match channel administrator id"))
                {
                    return Unauthorized();
                }
                return BadRequest(new ErrorViewModel
                {
                    Message = result.Message,
                    Errors = channelHandler.Notifications.Select(notification => (object)notification).ToList()
                });
            }
            return NoContent();
        }
    }
}