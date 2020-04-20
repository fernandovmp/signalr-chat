import React, { useState, useEffect } from 'react';
import { getChatHeaderStyles } from './styles';
import { getCommonStyles } from '../../../styles/commonStyles';
import { PopupComponent } from '../../PopupComponent';
import { EditChannelForm } from '../../EditChannelForm';
import Chat from '../../../models/Chat';
import { useChatApiService } from '../../../hooks/useChatApiService';
import { useParams } from 'react-router-dom';
import useLocalStorage from '../../../hooks/useLocalStorage';
import User from '../../../models/User';

export const ChatHeader: React.FC = () => {
    const [chat, setChat] = useState<Chat | undefined>(undefined);
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const { chatHeader, chatEditButton } = getChatHeaderStyles();
    const { transparentButton } = getCommonStyles();
    const chatApiService = useChatApiService();
    const [shouldShowEditPopup, setShouldShowEditPopup] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchChat = async () => {
            const _chat = await chatApiService.getChat(id ?? '', user);
            setChat(_chat);
        };
        fetchChat();
    }, [chatApiService, id]);

    return (
        <header className={chatHeader}>
            <strong>{chat?.name}</strong>
            {chat?.isAdministrator && (
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
                    <EditChannelForm channelId={chat?.id ?? ''} />
                </PopupComponent>
            )}
        </header>
    );
};
