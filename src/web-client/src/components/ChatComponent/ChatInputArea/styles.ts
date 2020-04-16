import { cretaeStyle } from '../../../styles/createStyle';

export interface IChatInputAreaClassNames {
    chatInputArea: string;
}

export const getChatInputAreaStyles = cretaeStyle<IChatInputAreaClassNames>({
    chatInputArea: {
        display: 'flex',
        padding: 15,
        alignItems: 'center',
        background: '#e0e0e0',
        gridColumn: '2',
        gridRow: '3',
        selectors: {
            '> textarea': {
                flex: 1,
                border: 0,
                borderRadius: 4,
                height: 30,
                padding: 4,
                selectors: {
                    ':focus': {
                        outline: 'none',
                    },
                },
            },
            '> button': {
                margin: '0 20px',
                width: 30,
                height: 30,
                backgroundColor: 'transparent',
                border: 0,
                outline: 'none',
                borderRadius: 6,
                paddingRight: 27,
                selectors: {
                    ':hover': {
                        cursor: 'pointer',
                    },
                },
            },
        },
    },
});
