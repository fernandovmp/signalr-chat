import React, { useState } from 'react';
import { IChatApiService } from '../../services';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import './styles.css';

type propsType = {
    chatApiService: IChatApiService;
    onSubmit?: () => void;
};

export const CreateChannelForm: React.FC<propsType> = ({
    chatApiService,
    onSubmit,
}) => {
    const [channelName, setChannelName] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await chatApiService.createChannelAsync(
            channelName,
            channelDescription,
            user.id
        );
        if (onSubmit) {
            onSubmit();
        }
    };

    return (
        <form className="create-channel-form" onSubmit={handleSubmit}>
            <label>
                Channel name:
                <input
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
            </label>
            <label>
                Channel description:
                <input
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                />
            </label>
            <button type="submit">Create</button>
        </form>
    );
};
