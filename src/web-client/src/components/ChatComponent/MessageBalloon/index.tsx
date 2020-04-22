import React from 'react';
import Message from '../../../models/Message';
import { getMessageBallonStyles } from './styles';

interface MessageBalloonProps {
    styles?: string[];
    message: Message;
}

const MessageBalloon: React.FC<MessageBalloonProps> = ({ styles, message }) => {
    const {
        messageBallon,
        messageContent,
        messageDate,
    } = getMessageBallonStyles();
    return (
        <div className={`${messageBallon} ${styles?.join(' ')}`}>
            <strong>{message.sender.username}</strong>
            <p className={messageContent}>{message.content}</p>
            <p className={messageDate}>{message.date.toString()}</p>
        </div>
    );
};

export default MessageBalloon;
