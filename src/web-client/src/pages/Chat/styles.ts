import { cretaeStyle } from '../../styles/createStyle';

export interface IChatPageClassNames {
    chatPage: string;
    pageSideBar: string;
}

export const getChatPageStyles = cretaeStyle<IChatPageClassNames>({
    chatPage: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        gridTemplateRows: '60px auto 70px',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    pageSideBar: {
        gridColumn: '1',
        gridRowStart: '1',
        gridRowEnd: '4',
    },
});
