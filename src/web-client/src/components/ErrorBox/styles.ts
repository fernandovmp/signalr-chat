import { cretaeStyle } from '../../styles/createStyle';

interface IErrorBoxClassNames {
    errorBox: string;
}

export const getErrorBoxStyles = cretaeStyle<IErrorBoxClassNames>({
    errorBox: {
        padding: 6,
        color: 'red',
        background: '#eee',
        fontSize: 'small',
        borderRadius: 2,
        marginBottom: 20,
    },
});
