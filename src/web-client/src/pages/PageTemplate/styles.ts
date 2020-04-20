import { cretaeStyle } from '../../styles/createStyle';

interface IPageTemplateClassNames {
    pageTemplate: string;
    pageSideBar: string;
    pageHeader: String;
    pageMain: string;
}

export const getPageTemplateStyles = cretaeStyle<IPageTemplateClassNames>({
    pageTemplate: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        gridTemplateRows: '60px auto',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    pageSideBar: {
        gridColumn: '1',
        gridRowStart: '1',
        gridRowEnd: '3',
    },
    pageHeader: {
        background: 'darkorchid',
        color: 'white',
        gridColumn: '2',
        gridRow: '1',
    },
    pageMain: {
        gridColumn: '2',
        gridRow: '2',
    },
});
