import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ChatComponent, SideBar, Tab } from '../../components';
import { IChatApiService, IChatService } from '../../services';
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
    const [currentChannel, setCurrentChannel] = useState<Channel | undefined>(
        undefined
    );
    const history = useHistory();
    const { chatPage, pageSideBar } = getChatPageStyles();

    useEffect(() => {
        const connectToChat = async () => {
            await chatService.connection.start();
        };
        connectToChat();

        const cleanup = async () => {
            await chatService.disconect();
        };
        return () => {
            cleanup();
        };
    }, [chatService]);

    useEffect(() => {
        if (user.username.trim() === '') {
            history.push('/');
        }
    }, [user, history]);

    const handleMenuSelected = async (arg: Tab | Channel) => {
        if ((arg as Channel).id) {
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
                        currentChannel={currentChannel}
                    />
                ) : (
                    <ExploreTab chatApiService={chatApiService} />
                )}
            </div>
        </>
    );
};

export default ChatPage;
