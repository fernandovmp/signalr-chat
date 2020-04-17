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
import { getChatComponentStyles } from './styles';

type propsType = {
    chatService: IChatService;
    messages: Message[];
    currentChannel?: Channel;
};

export const ChatComponent: React.FC<propsType> = ({
    chatService,
    messages,
    currentChannel,
}) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const { chatComponent } = getChatComponentStyles();
    const previousChannel = usePrevious(currentChannel);

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
        </>
    );
};
