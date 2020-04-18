import React from 'react';
import Channel from '../../models/Channel';

type propsType = {
    styles?: string[];
    channel: Channel;
    onClick?: (channel: Channel) => void;
};

export const ChatItem: React.FC<propsType> = ({ channel, onClick, styles }) => {
    const handleOnClick = () => {
        if (!onClick) return;
        onClick(channel);
    };
    return (
        <div className={styles?.join(' ')} onClick={handleOnClick}>
            <strong>{channel.name}</strong>
        </div>
    );
};
