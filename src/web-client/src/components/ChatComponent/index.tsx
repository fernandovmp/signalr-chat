import React, { useState, useEffect } from 'react';
import ChatInputArea from './ChatInputArea';
import Message from '../../models/Message';
import MessageBalloon from './MessageBalloon';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import usePrevious from '../../hooks/usePrevious';
import { ChatNotification } from './ChatNotification';
import { getChatComponentStyles } from './styles';
import { useParams } from 'react-router-dom';
import { useChatService } from '../../hooks/useChatService';

export const ChatComponent: React.FC = () => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatNotifications, setChatNotifications] = useState<string[]>([]);
    const {
        chatComponent,
        notificationsContainer,
        chatMessages,
    } = getChatComponentStyles();
    const { id } = useParams();
    const previousChat = usePrevious(id);
    const chatService = useChatService();

    useEffect(() => {
        const notificationAction = (notificationMessage: string) => {
            setChatNotifications((previousState) =>
                previousState.concat(notificationMessage)
            );
            setTimeout(
                () =>
                    setChatNotifications((previousState) =>
                        previousState.filter(
                            (notification) =>
                                notification !== notificationMessage
                        )
                    ),
                6000
            );
        };
        chatService.onUserJoined(notificationAction);
        chatService.onUserLeft(notificationAction);
        chatService.onReceiveMessage((message) => {
            setMessages((previousState) => [...previousState, message]);
        });

        return () => {
            if (id !== undefined) {
                chatService.leaveChannel(id, user.username);
            }
            chatService.disconect();
        };
    }, [chatService, user]);

    useEffect(() => {
        if (id !== undefined) {
            chatService.joinChannel(id, user.username);
        }
    }, [id, chatService, user]);

    useEffect(() => {
        if (previousChat !== undefined && previousChat !== id) {
            chatService.leaveChannel(previousChat, user.username);
        }
    }, [id, user]);

    const handleSend = (inputValue: string) => {
        const message: Message = {
            channelId: id ?? '',
            sender: user.username,
            content: inputValue,
            date: new Date(),
        };
        chatService.sendMessage(message);
    };

    return (
        <div className={chatComponent}>
            <div className={chatMessages}>
                {messages
                    .filter((message) => message.channelId === id)
                    .map((message) => (
                        <MessageBalloon
                            key={`${message.date}-${message.sender}`}
                            message={message}
                        />
                    ))}
            </div>
            <ChatInputArea handleSend={handleSend} />
            <div className={notificationsContainer}>
                {chatNotifications.map((notification) => (
                    <ChatNotification message={notification} />
                ))}
            </div>
        </div>
    );
};
