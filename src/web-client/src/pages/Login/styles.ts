import { mergeStyleSets } from '@uifabric/styling';
import { memoizeFunction } from '@uifabric/utilities';
import { CustomStyleSet } from '../../utils/CustomStyleSetType';
import { cretaeStyle } from '../../styles/createStyle';

export interface ILoginClassNames {
    loginForm: string;
    loginFormLabel: string;
    loginFormInput: string;
    loginFormButton: string;
}

export const getClassNames = cretaeStyle<ILoginClassNames>({
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        margin: '50px 30%',
    },
    loginFormLabel: {
        display: 'flex',
        flexDirection: 'column',
    },
    loginFormInput: {
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
    loginFormButton: {
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
