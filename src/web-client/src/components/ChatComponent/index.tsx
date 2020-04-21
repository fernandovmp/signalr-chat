import React, { useState, useEffect } from 'react';
import ChatInputArea from './ChatInputArea';
import { ChatService } from '../../services';
import Message from '../../models/Message';
import MessageBalloon from './MessageBalloon';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import usePrevious from '../../hooks/usePrevious';
import { ChatNotification } from './ChatNotification';
import { getChatComponentStyles } from './styles';
import { useParams } from 'react-router-dom';
import { HubConnectionState } from '@microsoft/signalr';

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
    const [chatService, setChatService] = useState(
        new ChatService('https://localhost:5001/chatHub')
    );

    useEffect(() => {
        const setupChatAsync = async () => {
            const chatService = new ChatService(
                'https://localhost:5001/chatHub'
            );
            await chatService.connection.start();
            const joinChannel = async () => {
                if (id !== undefined) {
                    await chatService.joinChannelAsync(id, user.username);
                }
            };
            joinChannel();
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
            setChatService(chatService);
        };
        setupChatAsync();
        const cleanup = async () => {
            await chatService.disconect();
        };
        return () => {
            cleanup();
        };
    }, [id]);

    useEffect(() => {
        const leaveChannel = async () => {
            if (
                previousChat !== undefined &&
                chatService.connection.state === HubConnectionState.Connected
            ) {
                await chatService.leaveChannelAsync(
                    previousChat,
                    user.username
                );
            }
        };
        leaveChannel();
    }, [id]);

    const handleSend = async (inputValue: string) => {
        const message: Message = {
            channelId: id ?? '',
            sender: user.username,
            content: inputValue,
            date: new Date(),
        };
        await chatService.sendMessageAsync(message);
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
