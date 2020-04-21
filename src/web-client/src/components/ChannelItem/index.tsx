import React from 'react';
import Channel from '../../models/Channel';
import { useChatApiService } from '../../hooks/useChatApiService';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { getChannelItemStyles } from './styles';
import { useHistory } from 'react-router-dom';

type propsType = {
    channel: Channel;
};

export const ChannelItem: React.FC<propsType> = ({ channel }) => {
    const chatApiService = useChatApiService();
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const history = useHistory();
    const {
        channelItem,
        descriptionSection,
        joinButton,
    } = getChannelItemStyles();

    const handleJoin = async () => {
        await chatApiService.joinChannel(channel, user);
        history.push(`/chat/${channel.id}`);
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
