import React from 'react';
import Channel from '../../../models/Channel';
import Chat from '../../../models/Chat';

type propsType = {
    styles?: string[];
    chat: Chat;
    onClick?: (chat: Chat) => void;
};

export const ChatItem: React.FC<propsType> = ({ chat, onClick, styles }) => {
    const handleOnClick = () => {
        if (!onClick) return;
        onClick(chat);
    };
    return (
        <div className={styles?.join(' ')} onClick={handleOnClick}>
            <strong>{chat.name}</strong>
        </div>
    );
};
