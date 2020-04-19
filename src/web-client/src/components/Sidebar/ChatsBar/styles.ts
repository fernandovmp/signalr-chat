import { cretaeStyle } from '../../../styles/createStyle';

export interface IChatsBarClassNames {
    chatList: string;
    chatSelected: string;
}

export const getChatsBarStyles = cretaeStyle<IChatsBarClassNames>({
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
});
