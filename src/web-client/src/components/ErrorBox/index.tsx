import React from 'react';
import { getErrorBoxStyles } from './styles';

type propsType = {
    message: string;
};

export const ErrorBox: React.FC<propsType> = ({ message }) => {
    const { errorBox } = getErrorBoxStyles();
    return (
        <div className={errorBox}>
            <p>{message}</p>
        </div>
    );
};
