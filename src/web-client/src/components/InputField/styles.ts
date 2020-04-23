import { cretaeStyle } from '../../styles/createStyle';

export interface IInputFieldClassNames {
    inputError: string;
}

export const getInputFieldStyles = cretaeStyle<IInputFieldClassNames>({
    inputError: {
        marginLeft: 8,
        marginTop: 4,
        color: 'red',
        fontSize: 'small',
    },
});
