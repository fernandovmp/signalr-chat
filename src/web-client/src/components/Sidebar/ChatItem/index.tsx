import React from 'react';
import Chat from '../../../models/Chat';
import { useHistory } from 'react-router-dom';

type propsType = {
    styles?: string[];
    chat: Chat;
    onClick?: (chat: Chat) => void;
};

export const ChatItem: React.FC<propsType> = ({ chat, onClick, styles }) => {
    const history = useHistory();
    const handleOnClick = () => {
        history.push(`/chat/${chat.id}`);
        if (!onClick) return;
        onClick(chat);
    };
    return (
        <div className={styles?.join(' ')} onClick={handleOnClick}>
            <strong>{chat.name}</strong>
        </div>
    );
};
