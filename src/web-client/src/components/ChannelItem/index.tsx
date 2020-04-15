import React from 'react';
import Channel from '../../models/Channel';
import { getChannelItemStyles } from './styles';

type propsType = {
    channel: Channel;
    onClick?: (channel: Channel) => void;
};

export const ChannelItem: React.FC<propsType> = ({ channel, onClick }) => {
    const { channelItem } = getChannelItemStyles();
    const handleOnClick = () => {
        if (!onClick) return;
        onClick(channel);
    };
    return (
        <div className={channelItem} onClick={handleOnClick}>
            <strong>{channel.name}</strong>
            <small>{channel.description ?? 'No description'}</small>
        </div>
    );
};
