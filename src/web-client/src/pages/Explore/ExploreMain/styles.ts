import { cretaeStyle } from '../../../styles/createStyle';

export interface IExploreMainClassNames {
    exploreMain: string;
    channelsList: string;
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
        gridRow: '2',
        gridColumn: '2',
    },
});
