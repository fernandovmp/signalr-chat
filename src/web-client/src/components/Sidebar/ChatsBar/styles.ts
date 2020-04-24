import { cretaeStyle } from '../../../styles/createStyle';

export interface IChatsBarClassNames {
    chatBar: string;
    chatList: string;
    chatSelected: string;
    showMore: string;
}

export const getChatsBarStyles = cretaeStyle<IChatsBarClassNames>({
    chatBar: {
        overflowY: 'auto',
    },
    chatList: {
        listStyle: 'none',
        padding: 0,
        selectors: {
            '> li': {
                margin: 10,
                borderRadius: 4,
            },
        },
    },
    chatSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    showMore: {
        margin: 10,
        color: 'white',
        fontWeight: 'bolder',
        fontSize: 'small',
        selectors: {
            ':hover': {
                cursor: 'pointer',
            },
        },
    },
});
