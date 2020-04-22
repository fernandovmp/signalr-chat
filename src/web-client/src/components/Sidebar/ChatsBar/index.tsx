import React, { useState, useEffect } from 'react';
import { ChatItem } from '../ChatItem';
import { getChatsBarStyles } from './styles';
import Chat from '../../../models/Chat';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useChatApiService } from '../../../hooks/useChatApiService';
import User from '../../../models/User';
import { useParams } from 'react-router-dom';

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
};

export const ChatsBar: React.FC<propsType> = ({ styles }) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [chats, setChats] = useState<Chat[]>([]);
    const chatApiService = useChatApiService();
    const { id } = useParams();
    const { chatList, chatSelected } = getChatsBarStyles();

    useEffect(() => {
        const getChannels = async () => {
            const chats = await chatApiService.getUserChats(user);
            setChats(chats);
        };
        getChannels();
    }, [chatApiService, user]);

    return (
        <div className={styles?.root?.join(' ')}>
            <ul className={chatList}>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className={chat.id === id ? chatSelected : ''}
                    >
                        <ChatItem styles={styles?.listItem} chat={chat} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
