import React from 'react';
import './styles.css';

type propsType = {
    username: string;
};

export const JoinNotification: React.FC<propsType> = ({ username }) => {
    return (
        <div className="join-notification">
            <p>
                <strong>{username}</strong> juntou-se ao chat
            </p>
        </div>
    );
};
