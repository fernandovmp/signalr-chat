import React from 'react';
import './styles.css';
import Channel from '../../models/Channel';
import ChannelItem from '../ChannelItem';

type propsType = {
    channels: Channel[];
    onChannelSelect?: (channel: Channel) => void;
};

const ChannelsBar: React.FC<propsType> = ({ channels, onChannelSelect }) => {
    return (
        <div className="channels-bar">
            <ul className="channels-list">
                {channels.map((channel) => (
                    <li key={channel.id}>
                        <ChannelItem
                            channel={channel}
                            onClick={onChannelSelect}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelsBar;
