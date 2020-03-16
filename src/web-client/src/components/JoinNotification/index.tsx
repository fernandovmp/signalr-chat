import React from 'react';
import './styles.css';

type propsType = {
    username: string;
};

const JoinNotification: React.FC<propsType> = ({ username }) => {
    return (
        <div className="join-notification">
            <p>
                <strong>{username}</strong> juntou-se ao chat
            </p>
        </div>
    );
};

export default JoinNotification;
