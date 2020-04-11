import React from 'react';
import './styles.css';
import Channel from '../../models/Channel';

type propsType = {
    channel: Channel;
    onClick?: (channel: Channel) => void;
};

const ChannelItem: React.FC<propsType> = ({ channel, onClick }) => {
    const handleOnClick = () => {
        if (!onClick) return;
        onClick(channel);
    };
    return (
        <div className="channel-container" onClick={handleOnClick}>
            <strong>{channel.name}</strong>
        </div>
    );
};

export default ChannelItem;
