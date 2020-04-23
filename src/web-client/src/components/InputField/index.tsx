import React from 'react';
import { getCommonStyles } from '../../styles/commonStyles';
import { getInputFieldStyles } from './styles';

type propsType = {
    errors?: string[];
    fieldLabel: string;
    onChange: (value: string) => void;
    value: string;
};

export const InputField: React.FC<propsType> = ({
    errors,
    fieldLabel,
    onChange,
    value,
}) => {
    const { inputError } = getInputFieldStyles();
    const { formLabel, formInput } = getCommonStyles();

    return (
        <label className={formLabel}>
            {fieldLabel}
            <input
                className={formInput}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {errors?.map((error, index) => (
                <p key={index} className={inputError}>
                    {error}
                </p>
            ))}
        </label>
    );
};
