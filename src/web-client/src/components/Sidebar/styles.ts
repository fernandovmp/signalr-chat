import { cretaeStyle } from '../../styles/createStyle';

export interface ISidebarClassNames {
    sidebar: string;
    sidebarTab: string;
    exploreTab: string;
}

export const getSidebarStyles = cretaeStyle<ISidebarClassNames>({
    sidebar: {
        display: 'grid',
        gridTemplateRows: '10% 90%',
        backgroundColor: 'darkorchid',
    },
    sidebarTab: {
        padding: 10,
        margin: 10,
        height: 'max-content',
        borderRadius: 4,
        color: '#fff',
        selectors: {
            ':hover': {
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
            },
        },
    },
    exploreTab: {
        gridRow: '1',
        gridColumn: '1',
        display: 'flex',
        alignItems: 'center',
        selectors: {
            '> svg': {
                marginRight: 4,
            },
        },
    },
});