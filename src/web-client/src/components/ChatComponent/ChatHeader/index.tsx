import React, { useState } from 'react';
import { getChatHeaderStyles } from './styles';
import { getCommonStyles } from '../../../styles/commonStyles';
import { PopupComponent } from '../../PopupComponent';
import { EditChannelForm } from '../../EditChannelForm';
import Chat from '../../../models/Chat';

type propsType = {
    styles?: string[];
    chat: Chat;
};

export const ChatHeader: React.FC<propsType> = ({ styles, chat }) => {
    const { chatHeader, chatEditButton } = getChatHeaderStyles();
    const { transparentButton } = getCommonStyles();

    const [shouldShowEditPopup, setShouldShowEditPopup] = useState(false);

    return (
        <header className={`${chatHeader} ${styles?.join(' ')}`}>
            <strong>{chat.name}</strong>
            {chat.isAdministrator && (
                <button
                    className={[transparentButton, chatEditButton].join(' ')}
                    onClick={() => setShouldShowEditPopup(!shouldShowEditPopup)}
                >
                    <svg
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="white"
                            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                        />
                    </svg>
                </button>
            )}
            {shouldShowEditPopup && (
                <PopupComponent
                    onCloseButtonClick={() => setShouldShowEditPopup(false)}
                >
                    <EditChannelForm channelId={chat.id} />
                </PopupComponent>
            )}
        </header>
    );
};
