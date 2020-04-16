import { cretaeStyle } from '../../styles/createStyle';

export interface ILoginClassNames {
    loginForm: string;
}

export const getLoginPageStyles = cretaeStyle<ILoginClassNames>({
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        margin: '50px 30%',
    },
});
