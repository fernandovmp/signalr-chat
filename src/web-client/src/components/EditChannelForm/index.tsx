import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import Channel from '../../models/Channel';
import { useChatApiService } from '../../hooks/useChatApiService';
import { getCommonStyles } from '../../styles/commonStyles';
import { getEditChannelFormStyles } from './styles';
import EditIcon from '../../assets/circleEditIcon.svg';
import CancelIcon from '../../assets/cancelIcon.svg';
import SaveIcon from '../../assets/contentSaveEditIcon.svg';

type propsType = {
    channel: Channel;
};

export const EditChannelForm: React.FC<propsType> = ({ channel }) => {
    const chatApiService = useChatApiService();
    const [channelNameEditEnabled, setChannelNameEditEnabled] = useState(false);
    const [
        channelDescriptionEditEnabled,
        setChannelDescriptionEditEnabled,
    ] = useState(false);
    const [channelName, setChannelName] = useState(channel.name);
    const [channelDescription, setChannelDescription] = useState(
        channel.description
    );
    const [user] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const { transparentButton, formInput, formLabel } = getCommonStyles();
    const { editChannelForm, editInput } = getEditChannelFormStyles();

    const handleUpdateName = async () => {
        setChannelNameEditEnabled(false);
        await chatApiService.updateChannelName(
            channel.id,
            channelName,
            user.id
        );
    };

    const handleUpdateDescription = async () => {
        setChannelDescriptionEditEnabled(false);
        await chatApiService.updateDescriptionName(
            channel.id,
            user.id,
            channelDescription
        );
    };

    return (
        <div className={editChannelForm}>
            <label className={formLabel}>
                Channel name:
                <div className={editInput}>
                    <input
                        className={formInput}
                        disabled={!channelNameEditEnabled}
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                    <button
                        className={transparentButton}
                        onClick={() =>
                            setChannelNameEditEnabled(!channelNameEditEnabled)
                        }
                    >
                        <img
                            src={
                                channelNameEditEnabled === true
                                    ? CancelIcon
                                    : EditIcon
                            }
                        />
                    </button>
                    {channelNameEditEnabled && (
                        <button
                            className={transparentButton}
                            onClick={handleUpdateName}
                        >
                            <img src={SaveIcon} />
                        </button>
                    )}
                </div>
            </label>
            <label className={formLabel}>
                Channel description:
                <div className={editInput}>
                    <input
                        className={formInput}
                        disabled={!channelDescriptionEditEnabled}
                        value={channelDescription}
                        onChange={(e) => setChannelDescription(e.target.value)}
                    />
                    <button
                        className={transparentButton}
                        onClick={() =>
                            setChannelDescriptionEditEnabled(
                                !channelDescriptionEditEnabled
                            )
                        }
                    >
                        <img
                            src={
                                channelDescriptionEditEnabled === true
                                    ? CancelIcon
                                    : EditIcon
                            }
                        />
                    </button>
                    {channelDescriptionEditEnabled && (
                        <button
                            className={transparentButton}
                            onClick={handleUpdateDescription}
                        >
                            <img src={SaveIcon} />
                        </button>
                    )}
                </div>
            </label>
        </div>
    );
};
