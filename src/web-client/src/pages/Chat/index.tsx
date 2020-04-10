import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './styles.css';
import Message from '../../models/Message';
import MessageBalloon from '../../components/MessageBalloon';
import { IChatService } from '../../services/chatService';
import JoinNotification from '../../components/JoinNotification';
import { useHistory } from 'react-router-dom';
import User from '../../models/User';

type propsType = {
    chatService: IChatService;
};

const ChatPage: React.FC<propsType> = ({ chatService }) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [joinedNotifications, setjoinedNotifications] = useState<string[]>(
        []
    );
    const [messageInputValue, setMessageInputValue] = useState('');
    const history = useHistory();

    useEffect(() => {
        const setupChatAsync = async () => {
            await chatService.connection.start();
            await chatService.joinChatAsync(user.username);
            chatService.onUserJoined((user) => {
                setjoinedNotifications((previousState) =>
                    previousState.concat(user)
                );
                setTimeout(
                    () =>
                        setjoinedNotifications((previousState) =>
                            previousState.filter(
                                (notification) => notification !== user
                            )
                        ),
                    6000
                );
            });
            chatService.onReceiveMessage((message) => {
                setMessages((previousState) => [...previousState, message]);
            });
        };
        console.log(user);
        if (user.username.trim() === '') {
            history.push('/');
            return;
        } else {
            setupChatAsync();
        }
        const cleanup = async () => {
            await chatService.disconect();
        };
        return () => {
            cleanup();
        };
    }, [chatService]);

    const handleSend = async () => {
        const message: Message = {
            sender: user.username,
            content: messageInputValue,
            date: new Date(),
        };
        await chatService.sendMessageAsync(message);
        setMessageInputValue('');
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((_message) => (
                    <MessageBalloon
                        key={`${_message.date}-${_message.sender}`}
                        message={_message}
                    />
                ))}
            </div>
            <div className="chat-input-area">
                <textarea
                    placeholder="Digite sua menssagem..."
                    value={messageInputValue}
                    onChange={(e) => setMessageInputValue(e.target.value)}
                    maxLength={255}
                ></textarea>
                <button onClick={() => handleSend()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="black"
                    >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
            <div className="chat-notification-container">
                {joinedNotifications.map((joinedUser) => (
                    <JoinNotification username={joinedUser} />
                ))}
            </div>
        </div>
    );
};

export default ChatPage;
