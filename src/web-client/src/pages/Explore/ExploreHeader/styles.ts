import { cretaeStyle } from '../../../styles/createStyle';

interface IExploreHeaderClassNames {
    exploreHeader: string;
    headerButton: string;
}

export const getExploreHeaderStyles = cretaeStyle<IExploreHeaderClassNames>({
    exploreHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    headerButton: {
        display: 'flex',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        fontWeight: 'bold',
    },
});
