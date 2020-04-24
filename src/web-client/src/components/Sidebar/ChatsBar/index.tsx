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

const pageSize = 5;

export const ChatsBar: React.FC<propsType> = ({ styles }) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [chats, setChats] = useState<Chat[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurretPage] = useState(1);
    const chatApiService = useChatApiService();
    const { id } = useParams();
    const { chatBar, chatList, chatSelected, showMore } = getChatsBarStyles();

    useEffect(() => {
        const getChannels = async () => {
            const pagedChats = await chatApiService.getUserChats(
                user,
                1,
                pageSize
            );
            setChats(pagedChats.result);
            setTotalCount(pagedChats.totalCount);
            setCurretPage(1);
        };
        getChannels();
    }, [chatApiService, user]);

    const handleShowMore = async () => {
        const nextPage = currentPage + 1;
        const pagedChats = await chatApiService.getUserChats(
            user,
            nextPage,
            pageSize
        );
        setChats((previousState) => [...previousState, ...pagedChats.result]);
        setTotalCount(pagedChats.totalCount);
        setCurretPage(nextPage);
    };

    return (
        <div className={`${chatBar} ${styles?.root?.join(' ')}`}>
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
            {chats.length < totalCount && (
                <p className={showMore} onClick={handleShowMore}>
                    Show more
                </p>
            )}
        </div>
    );
};
