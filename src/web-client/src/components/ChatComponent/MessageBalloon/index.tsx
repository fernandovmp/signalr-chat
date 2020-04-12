import React from 'react';
import Message from '../../../models/Message';
import './styles.css';

interface MessageBalloonProps {
    message: Message;
}

const MessageBalloon: React.FC<MessageBalloonProps> = ({ message }) => {
    return (
        <div className="message-balloon">
            <strong>{message.sender}</strong>
            <p className="message">{message.content}</p>
            <p className="message-date">{message.date.toString()}</p>
        </div>
    );
};

export default MessageBalloon;
