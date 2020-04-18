import { cretaeStyle } from '../../styles/createStyle';

interface IPopupClassNames {
    popupPanel: string;
    popup: string;
    popupHeader: string;
    popupMain: string;
}

export const getPopupStyles = cretaeStyle<IPopupClassNames>({
    popupPanel: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.2)',
    },
    popup: {
        position: 'absolute',
        top: '25%',
        bottom: '25%',
        left: '25%',
        right: '25%',
        background: 'white',
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.75)',
        borderRadius: 6,
        color: 'black',
    },
    popupHeader: {
        padding: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '10%',
    },
    popupMain: {
        padding: 4,
    },
});
