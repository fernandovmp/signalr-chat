import { cretaeStyle } from './createStyle';

export interface ICommonStylesClassNames {
    transparentButton: string;
    formLabel: string;
    formInput: string;
    formButton: string;
}

export const getCommonStyles = cretaeStyle<ICommonStylesClassNames>({
    transparentButton: {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 4,
        color: 'white',
        selectors: {
            ':hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
            },
        },
    },
    formLabel: {
        display: 'flex',
        flexDirection: 'column',
    },
    formInput: {
        border: 0,
        borderBottom: 'solid darkorchid 2px',
        backgroundColor: '#eee',
        padding: 4,
        height: 20,
        selectors: {
            ':focus': {
                outline: 'none',
            },
        },
    },
    formButton: {
        border: 'none',
        borderRadius: 2,
        backgroundColor: 'darkorchid',
        color: 'white',
        height: 40,
        fontWeight: 'bold',
        marginTop: 10,
        selectors: {
            ':hover': {
                cursor: 'pointer',
            },
        },
    },
});
