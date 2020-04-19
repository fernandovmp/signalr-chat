import { cretaeStyle } from '../../styles/createStyle';

export interface IChannelItemClassNames {
    channelItem: string;
    descriptionSection: string;
    joinButton: string;
}

export const getChannelItemStyles = cretaeStyle<IChannelItemClassNames>({
    channelItem: {
        margin: '0 10px',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #b700ff',
        borderRadius: 4,
    },
    descriptionSection: {
        fontSize: 'medium',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        selectors: {
            '> small': {
                margin: '10px 0',
                wordWrap: 'break-word',
            },
            '> strong': {
                wordWrap: 'break-word',
            },
        },
    },
    joinButton: {
        border: 'none',
        borderRadius: 4,
        backgroundColor: '#b700ff',
        color: 'white',
        height: 30,
        width: 50,
        fontWeight: 'bold',
        selectors: {
            ':hover': {
                cursor: 'pointer',
            },
        },
    },
});
