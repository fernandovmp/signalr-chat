import { cretaeStyle } from '../../../styles/createStyle';

interface IChatNotificationClassNames {
    notification: string;
}

export const getChatNotificationStyles = cretaeStyle<
    IChatNotificationClassNames
>({
    notification: {
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        color: 'white',
        height: 20,
        width: 'fit-content',
        padding: 4,
        selectors: {
            '> strong': {
                margin: 0,
                fontSize: 'small',
            },
        },
    },
});
