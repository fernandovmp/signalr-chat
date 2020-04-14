import React from 'react';
import Channel from '../../models/Channel';
import './styles.css';

type propsType = {
    channel: Channel;
    onClick?: (channel: Channel) => void;
};

export const ChatItem: React.FC<propsType> = ({ channel, onClick }) => {
    const handleOnClick = () => {
        if (!onClick) return;
        onClick(channel);
    };
    return (
        <div className="chat-item" onClick={handleOnClick}>
            <strong>{channel.name}</strong>
        </div>
    );
};
