import React from 'react';
import { getPopupStyles } from './styles';
import { getCommonStyles } from '../../styles/commonStyles';

type propsType = {
    onCloseButtonClick: () => void;
};

export const PopupComponent: React.FC<propsType> = ({
    onCloseButtonClick,
    children,
}) => {
    const { transparentButton } = getCommonStyles();
    const { popupPanel, popup, popupHeader, popupMain } = getPopupStyles();
    return (
        <div className={popupPanel}>
            <div className={popup}>
                <header className={popupHeader}>
                    <button
                        className={transparentButton}
                        onClick={onCloseButtonClick}
                    >
                        <svg
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#dd1111"
                                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                            />
                        </svg>
                    </button>
                </header>
                <main className={popupMain}>{children}</main>
            </div>
        </div>
    );
};
