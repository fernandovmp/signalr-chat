import { cretaeStyle } from '../../styles/createStyle';

export interface IPaginationClassNames {
    pagination: string;
    paginationCurrentPage: string;
    paginationNavigation: string;
}

export const getPaginationStyles = cretaeStyle<IPaginationClassNames>({
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationCurrentPage: {
        margin: '0 10px',
    },
    paginationNavigation: {
        color: 'blue',
        textDecoration: 'underline',
        selectors: {
            ':hover': {
                cursor: 'pointer',
            },
        },
    },
});
