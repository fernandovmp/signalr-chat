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
import {
    validateChannelName,
    validateChannelDescription,
} from '../../validations';

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
        const validName = validateChannelName(channelName);
        const validDescription = validateChannelDescription(channelDescription);
        if (!(validName.valid && validDescription.valid)) {
            setError({
                message: 'Invalid input',
                errors: [...validName.errors, ...validDescription.errors],
            });
            return false;
        }
        return true;
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
