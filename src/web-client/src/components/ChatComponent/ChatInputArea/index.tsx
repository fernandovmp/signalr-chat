import React, { useState } from 'react';
import './styles.css';

type propsType = {
    handleSend(inputValue: string): void;
};

const ChatInputArea: React.FC<propsType> = ({ handleSend }) => {
    const [messageInputValue, setMessageInputValue] = useState('');

    const onSendButtonClick = () => {
        handleSend(messageInputValue);
        setMessageInputValue('');
    };

    return (
        <div className="chat-input-area">
            <textarea
                placeholder="Type your message here..."
                value={messageInputValue}
                onChange={(e) => setMessageInputValue(e.target.value)}
                maxLength={255}
            ></textarea>
            <button onClick={() => onSendButtonClick()}>
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
    );
};

export default ChatInputArea;
