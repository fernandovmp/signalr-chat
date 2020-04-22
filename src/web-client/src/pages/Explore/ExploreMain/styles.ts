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
        selectors: {
            '> li': {
                margin: '10px 20%',
                maxWidth: 500,
            },
        },
    },
    exploreMain: {
        overflowY: 'scroll',
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
