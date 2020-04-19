import React from 'react';
import Channel from '../../models/Channel';
import { useChatApiService } from '../../hooks/useChatApiService';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { getChannelItemStyles } from './styles';

type propsType = {
    channel: Channel;
};

export const ChannelItem: React.FC<propsType> = ({ channel }) => {
    const chatApiService = useChatApiService();
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const {
        channelItem,
        descriptionSection,
        joinButton,
    } = getChannelItemStyles();

    const handleJoin = async () => {
        await chatApiService.joinChannel(channel, user);
    };

    return (
        <div className={channelItem}>
            <section className={descriptionSection}>
                <strong>{channel.name}</strong>
                <small>{channel.description ?? 'No description'}</small>
            </section>
            <button className={joinButton} onClick={handleJoin}>
                Join
            </button>
        </div>
    );
};
