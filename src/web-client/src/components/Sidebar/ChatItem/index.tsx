import React from 'react';
import Chat from '../../../models/Chat';
import { useHistory } from 'react-router-dom';

type propsType = {
    styles?: string[];
    chat: Chat;
};

export const ChatItem: React.FC<propsType> = ({ chat, styles }) => {
    const history = useHistory();
    const handleOnClick = () => {
        history.push(`/chat/${chat.id}`);
    };
    return (
        <div className={styles?.join(' ')} onClick={handleOnClick}>
            <strong>{chat.name}</strong>
        </div>
    );
};
