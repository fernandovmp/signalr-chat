import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ChatComponent, SideBar, Tab } from '../../components';
import { IChatApiService, IChatService } from '../../services';
import User from '../../models/User';
import { ExploreTab } from '../../components/ExploreTab';
import { getChatPageStyles } from './styles';
import Chat from '../../models/Chat';

type propsType = {
    chatService: IChatService;
    chatApiService: IChatApiService;
};

const ChatPage: React.FC<propsType> = ({ chatService, chatApiService }) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined);
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

    const handleMenuSelected = async (arg: Tab | Chat) => {
        if ((arg as Chat).id) {
            setCurrentChat(arg as Chat);
        } else {
            setCurrentChat(undefined);
        }
    };

    return (
        <>
            <div className={chatPage}>
                <SideBar
                    onMenuSelected={handleMenuSelected}
                    styles={[pageSideBar]}
                />
                {currentChat !== undefined ? (
                    <ChatComponent
                        chatService={chatService}
                        currentChat={currentChat}
                    />
                ) : (
                    <ExploreTab chatApiService={chatApiService} />
                )}
            </div>
        </>
    );
};

export default ChatPage;
