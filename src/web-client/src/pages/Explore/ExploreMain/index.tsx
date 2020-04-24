import React, { useState, useEffect } from 'react';
import Channel from '../../../models/Channel';
import { ChannelItem } from '../../../components';
import { getExploreMainStyles } from './styles';
import { useChatApiService } from '../../../hooks/useChatApiService';

export const ExploreMain: React.FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const chatApiService = useChatApiService();
    const { channelsList, exploreMain, emptyListText } = getExploreMainStyles();

    useEffect(() => {
        const getChannels = async () => {
            const pagedChannels = await chatApiService.getChannelsAsync(1, 5);
            setChannels(pagedChannels.result);
        };
        getChannels();
    }, [chatApiService]);

    return (
        <main className={exploreMain}>
            <ul className={channelsList}>
                {channels.map((channel) => (
                    <li key={channel.id}>
                        <ChannelItem channel={channel} />
                    </li>
                ))}

                {channels.length === 0 && (
                    <div className={emptyListText}>No channels availible</div>
                )}
            </ul>
        </main>
    );
};
