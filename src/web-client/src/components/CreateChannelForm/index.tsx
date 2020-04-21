import React, { useState } from 'react';
import { IChatApiService } from '../../services';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { getCommonStyles } from '../../styles/commonStyles';
import { getCreateChannelFormStyles } from './styles';
import { useChatApiService } from '../../hooks/useChatApiService';
import { useHistory } from 'react-router-dom';

export const CreateChannelForm: React.FC = () => {
    const [channelName, setChannelName] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const chatApiService = useChatApiService();
    const history = useHistory();
    const { formButton, formInput, formLabel } = getCommonStyles();
    const { createChannelForm } = getCreateChannelFormStyles();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const channel = await chatApiService.createChannelAsync(
            channelName,
            channelDescription,
            user.id
        );
        history.push(`/chat/${channel.id}`);
    };

    return (
        <form className={createChannelForm} onSubmit={handleSubmit}>
            <label className={formLabel}>
                Channel name:
                <input
                    className={formInput}
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
            </label>
            <label className={formLabel}>
                Channel description:
                <input
                    className={formInput}
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                />
            </label>
            <button className={formButton} type="submit">
                Create
            </button>
        </form>
    );
};
