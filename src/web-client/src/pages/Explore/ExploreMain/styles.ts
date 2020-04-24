import { cretaeStyle } from '../../../styles/createStyle';

export interface IExploreMainClassNames {
    exploreMain: string;
    channelsList: string;
    emptyListText: string;
}

export const getExploreMainStyles = cretaeStyle<IExploreMainClassNames>({
    channelsList: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        selectors: {
            '> li': {
                margin: '10px 0',
                width: '100%',
                maxWidth: 500,
            },
        },
    },
    exploreMain: {
        overflowY: 'auto',
        background: '#eee',
        height: '100%',
    },
    emptyListText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontStyle: 'italic',
    },
});
