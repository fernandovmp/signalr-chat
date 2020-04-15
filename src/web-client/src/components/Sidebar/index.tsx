import React, { useState, useEffect } from 'react';
import Channel from '../../models/Channel';
import { ChannelsBar } from '../ChannelsBar';
import { IChatApiService } from '../../services';
import { getSidebarStyles } from './styles';

type propsType = {
    chatApiService: IChatApiService;
    onMenuSelected?: (menu: Tab | Channel) => void;
    styles?: [string];
};

export type Tab = {
    tabName: string;
};

export const SideBar: React.FC<propsType> = ({
    chatApiService,
    onMenuSelected,
    styles,
}) => {
    const [selectedMenu, setSelectedMenu] = useState<Channel | Tab>({
        tabName: 'explore',
    });
    const [channels, setChannels] = useState<Channel[]>([]);
    const { sidebar, exploreTab, sidebarTab, channelsBar } = getSidebarStyles();

    useEffect(() => {
        const getChannels = async () => {
            const channels = await chatApiService.getChannelsAsync();
            setChannels(channels);
        };
        getChannels();
    }, [chatApiService]);

    const handleMenuSelected = (menu: Tab | Channel) => {
        setSelectedMenu(menu);
        if (onMenuSelected !== undefined) {
            onMenuSelected(menu);
        }
    };

    return (
        <div className={sidebar + ' ' + styles?.join(' ')}>
            <div
                className={[exploreTab, sidebarTab].join(' ')}
                onClick={() => handleMenuSelected({ tabName: 'explore' })}
            >
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="white"
                        d="M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z"
                    />
                </svg>
                Explore
            </div>

            <ChannelsBar
                styles={{
                    root: [channelsBar],
                    listItem: [sidebarTab],
                }}
                channels={channels}
                onChannelSelect={(arg) =>
                    handleMenuSelected(arg.selectedChannel)
                }
            />
        </div>
    );
};
