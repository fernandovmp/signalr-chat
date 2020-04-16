import { cretaeStyle } from '../../../styles/createStyle';

export interface IMessageBallonClassNames {
    messageBallon: string;
    messageContent: string;
    messageDate: string;
}

export const getMessageBallonStyles = cretaeStyle<IMessageBallonClassNames>({
    messageBallon: {
        width: 'fit-content',
        maxWidth: '30%',
        fontSize: 'small',
        padding: '4px 8px 0 8px',
        background: 'slateblue',
        borderRadius: 4,
        color: 'white',
    },
    messageContent: {
        marginTop: 4,
        marginBottom: 0,
        wordWrap: 'break-word',
    },
    messageDate: {
        marginTop: 4,
        marginBottom: 2,
        textAlign: 'right',
        fontSize: 'smaller',
    },
});
