import React, { useState, useEffect } from 'react';
import Channel from '../../models/Channel';
import { IChatApiService } from '../../services';
import { ChannelItem } from '../ChannelItem';
import { CreateChannelForm } from '../CreateChannelForm';
import { getExploreTabStyles } from './styles';

type propsType = {
    chatApiService: IChatApiService;
};

enum ExploreTabMainContent {
    Explore,
    CreateChannel,
}

export const ExploreTab: React.FC<propsType> = ({ chatApiService }) => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [contentType, setContentType] = useState<ExploreTabMainContent>(
        ExploreTabMainContent.Explore
    );
    const {
        channelsList,
        exploreHeader,
        exploreMain,
        headerButton,
        tranparentButton,
    } = getExploreTabStyles();

    useEffect(() => {
        const getChannels = async () => {
            const channels = await chatApiService.getChannelsAsync();
            setChannels(channels);
        };
        getChannels();
    }, [chatApiService]);

    return (
        <>
            <header className={exploreHeader}>
                {contentType !== ExploreTabMainContent.Explore && (
                    <button
                        className={[headerButton, tranparentButton].join(' ')}
                        onClick={() =>
                            setContentType(ExploreTabMainContent.Explore)
                        }
                    >
                        Back
                    </button>
                )}
                <button
                    className={[headerButton, tranparentButton].join(' ')}
                    onClick={() =>
                        setContentType(ExploreTabMainContent.CreateChannel)
                    }
                >
                    <svg
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#ffffff"
                            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                        />
                    </svg>
                    Create channel
                </button>
            </header>
            <main className={exploreMain}>
                {contentType === ExploreTabMainContent.CreateChannel ? (
                    <CreateChannelForm
                        chatApiService={chatApiService}
                        onSubmit={() =>
                            setContentType(ExploreTabMainContent.Explore)
                        }
                    />
                ) : (
                    <ul className={channelsList}>
                        {channels.map((channel) => (
                            <li key={channel.id}>
                                <ChannelItem channel={channel} />
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
};
