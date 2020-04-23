import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { getCommonStyles } from '../../styles/commonStyles';
import { getCreateChannelFormStyles } from './styles';
import { useChatApiService } from '../../hooks/useChatApiService';
import { useHistory } from 'react-router-dom';
import Channel from '../../models/Channel';
import { InputField } from '../InputField';
import ErrorModel from '../../models/ErrorModel';
import { ErrorBox } from '../ErrorBox';

export const CreateChannelForm: React.FC = () => {
    const [channelName, setChannelName] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [error, setError] = useState<ErrorModel>();
    const chatApiService = useChatApiService();
    const history = useHistory();
    const { formButton } = getCommonStyles();
    const { createChannelForm } = getCreateChannelFormStyles();

    const handleValidations = () => {
        let valid = true;
        const inputErrors = [];
        if (channelName.trim() === '') {
            inputErrors.push({
                property: 'Name',
                message: "Channel name can't be null or white spaces",
            });
            valid = false;
        }
        if (channelName.trim().length > 32) {
            inputErrors.push({
                property: 'Name',
                message: 'Channel name should be at maximum 32 characters',
            });
            valid = false;
        }
        if (channelDescription.length > 100) {
            inputErrors.push({
                property: 'Description',
                message:
                    'Channel description should be at maximum 100 characters',
            });
        }
        if (!valid) {
            setError({
                message: 'Invalid input',
                errors: inputErrors,
            });
        }
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!handleValidations()) return;
        const response = await chatApiService.createChannelAsync(
            channelName,
            channelDescription,
            user.id
        );
        const errors = response as ErrorModel;
        if (errors.message) {
            setError(errors);
            return;
        }
        const channel = response as Channel;
        if (channel.id) {
            history.push(`/chat/${channel.id}`);
        }
    };

    return (
        <form className={createChannelForm} onSubmit={handleSubmit}>
            {error !== undefined && <ErrorBox message={error.message} />}
            <InputField
                fieldLabel="Channel name:"
                value={channelName}
                onChange={setChannelName}
                errors={error?.errors
                    ?.filter(
                        (propertyError) => propertyError.property === 'Name'
                    )
                    .map((propertyError) => propertyError.message)}
            />
            <InputField
                fieldLabel="Channel description:"
                value={channelDescription}
                onChange={setChannelDescription}
                errors={error?.errors
                    ?.filter(
                        (propertyError) =>
                            propertyError.property === 'Description'
                    )
                    .map((propertyError) => propertyError.message)}
            />
            <button className={formButton} type="submit">
                Create
            </button>
        </form>
    );
};
