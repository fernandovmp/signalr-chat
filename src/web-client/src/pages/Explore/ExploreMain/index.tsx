import React, { useState, useEffect } from 'react';
import Channel from '../../../models/Channel';
import { ChannelItem } from '../../../components';
import { getExploreMainStyles } from './styles';
import { useChatApiService } from '../../../hooks/useChatApiService';
import PaginatedList from '../../../models/PaginatedList';
import { Pagination } from '../../../components';

const pageSize = 5;

export const ExploreMain: React.FC = () => {
    const [channels, setChannels] = useState<PaginatedList<Channel>>({
        currentPage: 1,
        pageSize: 10,
        result: [],
        totalCount: 0,
        totalPages: 1,
    });
    const chatApiService = useChatApiService();
    const { channelsList, exploreMain, emptyListText } = getExploreMainStyles();

    useEffect(() => {
        const getChannels = async () => {
            const pagedChannels = await chatApiService.getChannelsAsync(
                1,
                pageSize
            );
            setChannels(pagedChannels);
        };
        getChannels();
    }, [chatApiService]);

    const handleOnChangePage = async (page: number) => {
        const pagedChannels = await chatApiService.getChannelsAsync(
            page,
            pageSize
        );
        setChannels(pagedChannels);
    };

    return (
        <main className={exploreMain}>
            <ul className={channelsList}>
                {channels.result.map((channel) => (
                    <li key={channel.id}>
                        <ChannelItem channel={channel} />
                    </li>
                ))}

                {channels.result.length === 0 && (
                    <div className={emptyListText}>No channels availible</div>
                )}
            </ul>
            <Pagination
                currentPage={channels.currentPage}
                totalPages={channels.totalPages}
                onChangePage={handleOnChangePage}
            />
        </main>
    );
};
