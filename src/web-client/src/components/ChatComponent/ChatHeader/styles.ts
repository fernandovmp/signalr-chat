import { cretaeStyle } from '../../../styles/createStyle';

interface IChatHeaderClassNames {
    chatHeader: string;
    chatEditButton: string;
}

export const getChatHeaderStyles = cretaeStyle<IChatHeaderClassNames>({
    chatHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatEditButton: {
        marginLeft: 30,
    },
});
