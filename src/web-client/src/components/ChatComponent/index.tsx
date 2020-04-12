import React from 'react';
import ChatInputArea from './ChatInputArea';
import { IChatService } from '../../services/chatService';
import Message from '../../models/Message';
import MessageBalloon from '../MessageBalloon';
import './styles.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';

type propsType = {
    chatService: IChatService;
    messages: Message[];
};

const ChatComponent: React.FC<propsType> = ({ chatService, messages }) => {
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });

    const handleSend = async (inputValue: string) => {
        const message: Message = {
            sender: user.username,
            content: inputValue,
            date: new Date(),
        };
        await chatService.sendMessageAsync(message);
    };

    return (
        <>
            <ChatInputArea handleSend={handleSend} />
            <div className="chat-messages">
                {messages.map((message) => (
                    <MessageBalloon
                        key={`${message.date}-${message.sender}`}
                        message={message}
                    />
                ))}
            </div>
        </>
    );
};

export default ChatComponent;
