import React from 'react';
import Channel from '../../../models/Channel';
import { getChatHeaderStyles } from './styles';

type propsType = {
    styles?: string[];
    chat?: Channel;
};

export const ChatHeader: React.FC<propsType> = ({ styles, chat }) => {
    const { chatHeader } = getChatHeaderStyles();
    return (
        <header className={`${chatHeader} ${styles?.join(' ')}`}>
            <strong>{chat?.name}</strong>
        </header>
    );
};
