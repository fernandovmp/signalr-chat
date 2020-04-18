import { cretaeStyle } from '../../styles/createStyle';

export interface IChatComponentClassNames {
    chatComponent: string;
    notificationsContainer: string;
}

export const getChatComponentStyles = cretaeStyle<IChatComponentClassNames>({
    chatComponent: {
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px',
        gridColumn: '2',
        gridRow: '2',
        selectors: {
            '> div': {
                marginTop: 6,
            },
        },
    },
    notificationsContainer: {
        gridColumn: '2',
        gridRow: '2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 15,
    },
});
