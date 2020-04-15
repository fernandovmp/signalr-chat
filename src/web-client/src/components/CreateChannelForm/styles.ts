import { cretaeStyle } from '../../styles/createStyle';

export interface ICreateChannelFormClassNames {
    createChannelForm: string;
}

export const getCreateChannelFormStyles = cretaeStyle<
    ICreateChannelFormClassNames
>({
    createChannelForm: {
        display: 'flex',
        flexDirection: 'column',
        margin: '50px 30%',
        selectors: {
            '> label': {
                marginTop: 10,
            },
        },
    },
});
