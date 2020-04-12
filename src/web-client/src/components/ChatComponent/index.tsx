import React from 'react';
import ChatInputArea from './ChatInputArea';
import { IChatService } from '../../services';
import Message from '../../models/Message';
import MessageBalloon from './MessageBalloon';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import Channel from '../../models/Channel';
import './styles.css';

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
            <div className="chat-messages">
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
