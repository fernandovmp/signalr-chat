import React from 'react';
import { getChatNotificationStyles } from './styles';
type propsType = {
    message: string;
};

export const ChatNotification: React.FC<propsType> = ({ message }) => {
    const { notification } = getChatNotificationStyles();
    return (
        <div className={notification}>
            <strong>{message}</strong>
        </div>
    );
};
