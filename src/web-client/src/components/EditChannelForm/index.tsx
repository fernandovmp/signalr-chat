import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { useChatApiService } from '../../hooks/useChatApiService';
import { getEditChannelFormStyles } from './styles';
import { EditableField } from './EditableField';
import ErrorModel from '../../models/ErrorModel';
import {
    validateChannelName,
    validateChannelDescription,
} from '../../validations';

type propsType = {
    channelId: string;
};

export const EditChannelForm: React.FC<propsType> = ({ channelId }) => {
    const chatApiService = useChatApiService();
    const [channelName, setChannelName] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [channelNameError, setChannelNameError] = useState<ErrorModel>();
    const [channelDescriptionError, setChannelDescriptionError] = useState<
        ErrorModel
    >();
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
        const validName = validateChannelName(channelName);
        if (!validName.valid) {
            setChannelNameError({
                message: 'Invalid input',
                errors: validName.errors,
            });
            return;
        }
        const response = await chatApiService.updateChannelName(
            channelId,
            channelName,
            user.id
        );
        const errors = response as ErrorModel;
        if (errors.message) {
            setChannelNameError(errors);
        }
    };

    const handleUpdateDescription = async () => {
        const validDescription = validateChannelDescription(channelDescription);
        if (!validDescription.valid) {
            setChannelDescriptionError({
                message: 'Invalid input',
                errors: validDescription.errors,
            });
            return;
        }
        const response = await chatApiService.updateDescriptionName(
            channelId,
            user.id,
            channelDescription
        );
        const errors = response as ErrorModel;
        if (errors.message) {
            setChannelDescriptionError(errors);
        }
    };

    return (
        <div className={editChannelForm}>
            <EditableField
                fieldLabel="Channel name:"
                inputValue={channelName}
                setInputValue={setChannelName}
                onSave={handleUpdateName}
                errors={channelNameError?.errors?.map(
                    (propertyError) => propertyError.message
                )}
            />
            <EditableField
                fieldLabel="Channel description:"
                inputValue={channelDescription}
                setInputValue={setChannelDescription}
                onSave={handleUpdateDescription}
                errors={channelDescriptionError?.errors?.map(
                    (propertyError) => propertyError.message
                )}
            />
        </div>
    );
};
