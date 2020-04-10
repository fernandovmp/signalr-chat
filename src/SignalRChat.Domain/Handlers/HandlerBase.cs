using System.Collections.Generic;
using System.Linq;
using Flunt.Notifications;
using SignalRChat.Domain.DataOutputs;

namespace SignalRChat.Domain.Handlers
{
    public abstract class HandlerBase : Notifiable
    {
        protected IEnumerable<ErrorOutput> Errors => Notifications.Select(
            notification => new ErrorOutput(notification.Property, notification.Message));
    }
}
