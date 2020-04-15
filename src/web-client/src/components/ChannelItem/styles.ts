import { cretaeStyle } from '../../styles/createStyle';

export interface IChannelItemClassNames {
    channelItem: string;
}

export const getChannelItemStyles = cretaeStyle<IChannelItemClassNames>({
    channelItem: {
        margin: '0 10px',
        padding: 10,
        fontSize: 'medium',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #b700ff',
        borderRadius: 4,
        selectors: {
            '> small': {
                margin: '10px 0',
            },
        },
    },
});
