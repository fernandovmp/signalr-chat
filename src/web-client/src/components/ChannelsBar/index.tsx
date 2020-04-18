import React, { useState } from 'react';
import Channel from '../../models/Channel';
import { ChatItem } from '../ChatItem';
import { getChannelBarStyles } from './styles';

export type onChannelSelectArgument = {
    previousSelectedChannel?: Channel;
    selectedChannel: Channel;
};

interface IChannelsBarStyles {
    root?: string[];
    listItem?: string[];
}

type propsType = {
    styles?: IChannelsBarStyles;
    channels: Channel[];
    onChannelSelect?: (arg: onChannelSelectArgument) => void;
};

export const ChannelsBar: React.FC<propsType> = ({
    channels,
    onChannelSelect,
    styles,
}) => {
    const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(
        undefined
    );
    const { channelList, channelSelected } = getChannelBarStyles();

    const handleOnSelected = (channel: Channel) => {
        if (onChannelSelect !== undefined) {
            onChannelSelect({
                previousSelectedChannel: selectedChannel,
                selectedChannel: channel,
            });
        }
        setSelectedChannel(channel);
    };

    return (
        <div className={styles?.root?.join(' ')}>
            <ul className={channelList}>
                {channels.map((channel) => (
                    <li
                        key={channel.id}
                        className={`
                            ${
                                channel.id === selectedChannel?.id
                                    ? channelSelected
                                    : ''
                            }`}
                    >
                        <ChatItem
                            styles={styles?.listItem}
                            channel={channel}
                            onClick={handleOnSelected}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
