import { cretaeStyle } from '../../styles/createStyle';

export interface IChatComponentClassNames {
    chatMessages: string;
    chatComponent: string;
    notificationsContainer: string;
    senderMessage: string;
}

export const getChatComponentStyles = cretaeStyle<IChatComponentClassNames>({
    chatMessages: {
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px',
        gridColumn: '1',
        gridRow: '1',
        selectors: {
            '> div': {
                marginTop: 6,
            },
        },
    },
    chatComponent: {
        display: 'grid',
        gridTemplateRows: '1fr 70px',
        gridTemplateColumns: '1fr',
        height: '100%',
    },
    notificationsContainer: {
        gridColumn: '1',
        gridRow: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 15,
    },
    senderMessage: {
        alignSelf: 'flex-end',
    },
});
