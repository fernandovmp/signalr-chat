import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
    ChatComponent,
    JoinNotification,
    SideBar,
    Tab,
} from '../../components';
import { IChatApiService, IChatService } from '../../services';
import Message from '../../models/Message';
import User from '../../models/User';
import Channel from '../../models/Channel';
import { ExploreTab } from '../../components/ExploreTab';
import { getChatPageStyles } from './styles';

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
    const [currentChannel, setCurrentChannel] = useState<Channel | undefined>(
        undefined
    );
    const history = useHistory();
    const { chatPage, pageSideBar } = getChatPageStyles();

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

    const handleMenuSelected = async (arg: Tab | Channel) => {
        if (currentChannel !== undefined) {
            await chatService.leaveChannelAsync(
                currentChannel.id,
                user.username
            );
        }
        if ((arg as Channel).id) {
            await chatService.joinChannelAsync(
                (arg as Channel).id,
                user.username
            );
            setCurrentChannel(arg as Channel);
        } else {
            setCurrentChannel(undefined);
        }
    };

    return (
        <>
            <div className={chatPage}>
                <SideBar
                    chatApiService={chatApiService}
                    onMenuSelected={handleMenuSelected}
                    styles={[pageSideBar]}
                />
                {currentChannel !== undefined ? (
                    <ChatComponent
                        chatService={chatService}
                        messages={messages}
                        currentChannel={currentChannel}
                    />
                ) : (
                    <ExploreTab chatApiService={chatApiService} />
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
