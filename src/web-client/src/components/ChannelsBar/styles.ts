import { cretaeStyle } from '../../styles/createStyle';

export interface IChannelsBarClassNames {
    channelList: string;
    channelSelected: string;
}

export const getChannelBarStyles = cretaeStyle<IChannelsBarClassNames>({
    channelList: {
        listStyle: 'none',
        padding: 0,
        selectors: {
            '> li': {
                margin: 10,
                borderRadius: 4,
            },
        },
    },
    channelSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});
