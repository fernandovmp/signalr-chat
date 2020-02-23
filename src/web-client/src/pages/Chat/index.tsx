import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './styles.css';

const ChatPage: React.FC = () => {
    const [username] = useLocalStorage('username', '');

    return (
        <div className="chat-container">
            <div className="chat-messages"></div>
            <div className="chat-input-area">
                <textarea
                    placeholder="Digite sua menssagem..."
                    maxLength={255}
                ></textarea>
                <button>
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
