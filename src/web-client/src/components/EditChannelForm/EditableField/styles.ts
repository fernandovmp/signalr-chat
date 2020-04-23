import { cretaeStyle } from '../../../styles/createStyle';

interface IEditableFieldClassNames {
    editInput: string;
    inputError: string;
}

export const getEditableFieldStyles = cretaeStyle<IEditableFieldClassNames>({
    editInput: {
        display: 'flex',
        selectors: {
            '> input': {
                flexGrow: 1,
            },
        },
    },
    inputError: {
        marginLeft: 8,
        marginTop: 4,
        color: 'red',
        fontSize: 'small',
    },
});
