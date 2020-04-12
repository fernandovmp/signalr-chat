import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
    ChannelsBar,
    onChannelSelectArgument,
    ChatComponent,
    JoinNotification,
} from '../../components';
import { IChatApiService, IChatService } from '../../services';
import Message from '../../models/Message';
import User from '../../models/User';
import Channel from '../../models/Channel';
import './styles.css';

type propsType = {
    chatService: IChatService;
    chatApiService: IChatApiService;
};

const ChatPage: React.FC<propsType> = ({ chatService, chatApiService }) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [joinedNotifications, setjoinedNotifications] = useState<string[]>(
        []
    );
    const [channels, setChannels] = useState<Channel[]>([]);
    const [currentChannel, setCurrentChannel] = useState<Channel | undefined>(
        undefined
    );
    const history = useHistory();

    useEffect(() => {
        const setupChatAsync = async () => {
            await chatService.connection.start();
            const notificationAction = (notificationMessage: string) => {
                setjoinedNotifications((previousState) =>
                    previousState.concat(notificationMessage)
                );
                setTimeout(
                    () =>
                        setjoinedNotifications((previousState) =>
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
        console.log(user);
        if (user.username.trim() === '') {
            history.push('/');
            return;
        }
        setupChatAsync();

        const cleanup = async () => {
            await chatService.disconect();
        };
        return () => {
            cleanup();
        };
    }, [chatService]);

    useEffect(() => {
        const getChannels = async () => {
            const channels = await chatApiService.getChannelsAsync();
            setChannels(channels);
        };
        getChannels();
    }, [chatApiService]);

    const handleJoinChannel = async (arg: onChannelSelectArgument) => {
        const { previousSelectedChannel, selectedChannel } = arg;
        if (previousSelectedChannel !== undefined) {
            await chatService.leaveChannelAsync(
                previousSelectedChannel.id,
                user.username
            );
        }
        await chatService.joinChannelAsync(selectedChannel.id, user.username);
        setCurrentChannel(selectedChannel);
    };

    return (
        <>
            <div className="chat-container">
                <ChannelsBar
                    channels={channels}
                    onChannelSelect={handleJoinChannel}
                />
                {currentChannel !== undefined && (
                    <ChatComponent
                        chatService={chatService}
                        messages={messages}
                        currentChannel={currentChannel}
                    />
                )}

                <div className="chat-notification-container">
                    {joinedNotifications.map((joinedUser) => (
                        <JoinNotification username={joinedUser} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ChatPage;
