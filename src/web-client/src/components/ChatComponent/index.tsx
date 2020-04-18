import React, { useState, useEffect } from 'react';
import ChatInputArea from './ChatInputArea';
import { IChatService } from '../../services';
import Message from '../../models/Message';
import MessageBalloon from './MessageBalloon';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import Channel from '../../models/Channel';
import usePrevious from '../../hooks/usePrevious';
import { HubConnectionState } from '@microsoft/signalr';
import { ChatNotification } from './ChatNotification';
import { getChatComponentStyles } from './styles';

type propsType = {
    chatService: IChatService;
    currentChannel?: Channel;
};

export const ChatComponent: React.FC<propsType> = ({
    chatService,
    currentChannel,
}) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatNotifications, setChatNotifications] = useState<string[]>([]);
    const { chatComponent, notificationsContainer } = getChatComponentStyles();
    const previousChannel = usePrevious(currentChannel);

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
            previousChannel !== undefined
        ) {
            const leaveChannel = async () =>
                await chatService.leaveChannelAsync(
                    previousChannel.id,
                    user.username
                );
            leaveChannel();
        }
    }, [chatService, currentChannel, user]);

    useEffect(() => {
        if (
            chatService.connection.state === HubConnectionState.Connected &&
            currentChannel !== undefined
        ) {
            const joinChannel = async () =>
                await chatService.joinChannelAsync(
                    currentChannel.id,
                    user.username
                );
            joinChannel();
        }
    }, [chatService, currentChannel, user]);

    const handleSend = async (inputValue: string) => {
        const message: Message = {
            channelId: currentChannel?.id ?? '',
            sender: user.username,
            content: inputValue,
            date: new Date(),
        };
        await chatService.sendMessageAsync(message);
    };

    return (
        <>
            <div className={chatComponent}>
                {messages
                    .filter(
                        (message) => message.channelId === currentChannel?.id
                    )
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
