import { cretaeStyle } from '../../../styles/createStyle';

interface IEditableFieldClassNames {
    editInput: string;
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
});
