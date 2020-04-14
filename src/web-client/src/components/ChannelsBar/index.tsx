import React, { useState } from 'react';
import Channel from '../../models/Channel';
import { ChatItem } from '../ChatItem';
import './styles.css';

export type onChannelSelectArgument = {
    previousSelectedChannel?: Channel;
    selectedChannel: Channel;
};

type propsType = {
    channels: Channel[];
    onChannelSelect?: (arg: onChannelSelectArgument) => void;
};

export const ChannelsBar: React.FC<propsType> = ({
    channels,
    onChannelSelect,
}) => {
    const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(
        undefined
    );

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
        <div className="channels-bar">
            <ul className="channels-list">
                {channels.map((channel) => (
                    <li
                        key={channel.id}
                        className={`sidebar-tab 
                            ${
                                channel.id === selectedChannel?.id
                                    ? 'channel-selected'
                                    : ''
                            }`}
                    >
                        <ChatItem
                            channel={channel}
                            onClick={handleOnSelected}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
