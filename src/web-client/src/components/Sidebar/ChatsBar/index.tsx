import React, { useState } from 'react';
import { ChatItem } from '../ChatItem';
import { getChatsBarStyles } from './styles';
import Chat from '../../../models/Chat';

export type onChannelSelectArgument = {
    previousSelectedChat?: Chat;
    selectedChat: Chat;
};

interface IChatsBarStyles {
    root?: string[];
    listItem?: string[];
}

type propsType = {
    styles?: IChatsBarStyles;
    chats: Chat[];
    onChatSelect?: (arg: onChannelSelectArgument) => void;
};

export const ChatsBar: React.FC<propsType> = ({
    chats,
    onChatSelect,
    styles,
}) => {
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(
        undefined
    );
    const { chatList, chatSelected } = getChatsBarStyles();

    const handleOnSelected = (chat: Chat) => {
        if (onChatSelect !== undefined) {
            onChatSelect({
                previousSelectedChat: selectedChat,
                selectedChat: chat,
            });
        }
        setSelectedChat(chat);
    };

    return (
        <div className={styles?.root?.join(' ')}>
            <ul className={chatList}>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className={`
                            ${
                                chat.id === selectedChat?.id ? chatSelected : ''
                            }`}
                    >
                        <ChatItem
                            styles={styles?.listItem}
                            chat={chat}
                            onClick={handleOnSelected}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
