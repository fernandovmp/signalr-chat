import React, { useState } from 'react';
import { getCommonStyles } from '../../../styles/commonStyles';
import EditIcon from '../../../assets/circleEditIcon.svg';
import CancelIcon from '../../../assets/cancelIcon.svg';
import SaveIcon from '../../../assets/contentSaveEditIcon.svg';
import { getEditableFieldStyles } from './styles';

type propsType = {
    fieldLabel: string;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
    errors?: string[];
};

export const EditableField: React.FC<propsType> = ({
    fieldLabel,
    inputValue,
    setInputValue,
    onSave,
    errors,
}) => {
    const [editEnabled, setEditEnabled] = useState(false);
    const { formInput, formLabel, transparentButton } = getCommonStyles();
    const { editInput, inputError } = getEditableFieldStyles();

    const handleSave = () => {
        setEditEnabled(false);
        onSave();
    };

    return (
        <label className={formLabel}>
            {fieldLabel}
            <div className={editInput}>
                <input
                    className={formInput}
                    disabled={!editEnabled}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className={transparentButton}
                    onClick={() => setEditEnabled(!editEnabled)}
                >
                    <img
                        src={editEnabled === true ? CancelIcon : EditIcon}
                        alt={editEnabled === true ? 'cancel' : 'edit'}
                    />
                </button>
                {editEnabled && (
                    <button className={transparentButton} onClick={handleSave}>
                        <img src={SaveIcon} alt="save" />
                    </button>
                )}
            </div>
            {errors?.map((error, index) => (
                <p key={index} className={inputError}>
                    {error}
                </p>
            ))}
        </label>
    );
};
