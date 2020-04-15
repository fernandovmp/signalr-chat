import { cretaeStyle } from '../../styles/createStyle';

export interface IExploreTabClassNames {
    exploreHeader: string;
    headerButton: string;
    exploreMain: string;
    channelsList: string;
}

export const getExploreTabStyles = cretaeStyle<IExploreTabClassNames>({
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
    exploreHeader: {
        gridRow: '1',
        gridColumn: '2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'darkorchid',
    },
    exploreMain: {
        gridRow: '2',
        gridColumn: '2',
    },
    headerButton: {
        display: 'flex',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        fontWeight: 'bold',
    },
});
