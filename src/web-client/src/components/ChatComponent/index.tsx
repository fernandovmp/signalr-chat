import React, { useState, useEffect } from 'react';
import ChatInputArea from './ChatInputArea';
import { IChatService } from '../../services';
import Message from '../../models/Message';
import MessageBalloon from './MessageBalloon';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import usePrevious from '../../hooks/usePrevious';
import { HubConnectionState } from '@microsoft/signalr';
import { ChatNotification } from './ChatNotification';
import { getChatComponentStyles } from './styles';
import { ChatHeader } from './ChatHeader';
import Chat from '../../models/Chat';

type propsType = {
    chatService: IChatService;
    currentChat: Chat;
};

export const ChatComponent: React.FC<propsType> = ({
    chatService,
    currentChat,
}) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatNotifications, setChatNotifications] = useState<string[]>([]);
    const {
        chatComponent,
        notificationsContainer,
        chatHeader,
    } = getChatComponentStyles();
    const previousChat = usePrevious(currentChat);

    useEffect(() => {
        const setupChatAsync = async () => {
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
        };
        setupChatAsync();
    }, [chatService]);

    useEffect(() => {
        if (
            chatService.connection.state === HubConnectionState.Connected &&
            previousChat !== undefined
        ) {
            const leaveChannel = async () =>
                await chatService.leaveChannelAsync(
                    previousChat.id,
                    user.username
                );
            leaveChannel();
        }
    }, [chatService, currentChat, user]);

    useEffect(() => {
        if (
            chatService.connection.state === HubConnectionState.Connected &&
            currentChat !== undefined
        ) {
            const joinChannel = async () =>
                await chatService.joinChannelAsync(
                    currentChat.id,
                    user.username
                );
            joinChannel();
        }
    }, [chatService, currentChat, user]);

    const handleSend = async (inputValue: string) => {
        const message: Message = {
            channelId: currentChat.id,
            sender: user.username,
            content: inputValue,
            date: new Date(),
        };
        await chatService.sendMessageAsync(message);
    };

    return (
        <>
            <ChatHeader styles={[chatHeader]} chat={currentChat} />
            <div className={chatComponent}>
                {messages
                    .filter((message) => message.channelId === currentChat.id)
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
        </>
    );
};
