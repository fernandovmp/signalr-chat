import React from 'react';
import Message from '../../../models/Message';
import { getMessageBallonStyles } from './styles';

interface MessageBalloonProps {
    message: Message;
}

const MessageBalloon: React.FC<MessageBalloonProps> = ({ message }) => {
    const {
        messageBallon,
        messageContent,
        messageDate,
    } = getMessageBallonStyles();
    return (
        <div className={messageBallon}>
            <strong>{message.sender}</strong>
            <p className={messageContent}>{message.content}</p>
            <p className={messageDate}>{message.date.toString()}</p>
        </div>
    );
};

export default MessageBalloon;
