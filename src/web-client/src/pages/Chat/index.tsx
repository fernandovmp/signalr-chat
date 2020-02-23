import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './styles.css';
import Message from '../../models/Message';
import MessageBalloon from '../../components/MessageBalloon';

const ChatPage: React.FC = () => {
    const [username] = useLocalStorage('username', '');
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInputValue, setMessageInputValue] = useState('');

    const handleSend = async () => {
        const message: Message = {
            sender: username,
            content: messageInputValue,
            date: new Date()
        };
        setMessages(previousState => [...previousState, message]);
        setMessageInputValue('');
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map(_message => (
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
                    onChange={e => setMessageInputValue(e.target.value)}
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
        </div>
    );
};

export default ChatPage;
