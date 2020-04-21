import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { useChatApiService } from '../../hooks/useChatApiService';
import { getEditChannelFormStyles } from './styles';
import { EditableField } from './EditableField';

type propsType = {
    channelId: string;
};

export const EditChannelForm: React.FC<propsType> = ({ channelId }) => {
    const chatApiService = useChatApiService();
    const [channelName, setChannelName] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const { editChannelForm } = getEditChannelFormStyles();

    useEffect(() => {
        const fetchChannel = async () => {
            const channel = await chatApiService.getChannel(channelId);
            setChannelName(channel.name);
            setChannelDescription(channel.description ?? '');
        };
        fetchChannel();
    }, [chatApiService, channelId]);

    const handleUpdateName = async () => {
        await chatApiService.updateChannelName(channelId, channelName, user.id);
    };

    const handleUpdateDescription = async () => {
        await chatApiService.updateDescriptionName(
            channelId,
            user.id,
            channelDescription
        );
    };

    return (
        <div className={editChannelForm}>
            <EditableField
                fieldLabel="Channel name:"
                inputValue={channelName}
                setInputValue={setChannelName}
                onSave={handleUpdateName}
            />
            <EditableField
                fieldLabel="Channel description:"
                inputValue={channelDescription}
                setInputValue={setChannelDescription}
                onSave={handleUpdateDescription}
            />
        </div>
    );
};
