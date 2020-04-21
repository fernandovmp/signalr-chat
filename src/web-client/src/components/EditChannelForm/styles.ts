import { cretaeStyle } from '../../styles/createStyle';

export interface IEditChannelFormClassNames {
    editChannelForm: string;
}

export const getEditChannelFormStyles = cretaeStyle<IEditChannelFormClassNames>(
    {
        editChannelForm: {
            display: 'flex',
            flexDirection: 'column',
            margin: 50,
            selectors: {
                '> label': {
                    marginTop: 10,
                },
            },
        },
    }
);
