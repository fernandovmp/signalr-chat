import { ErrorData } from '../models/ErrorData';
import { validationResult } from './validationResult';

export const validateUsername = (username: string): validationResult => {
    let valid = true;
    const errors: ErrorData[] = [];
    if (username.trim() === '') {
        errors.push({
            property: 'Username',
            message: "Username can't be white spaces",
        });
        valid = false;
    }
    if (username.trim().length > 32) {
        errors.push({
            property: 'Username',
            message: 'Username should be at maximum 32 characters',
        });
        valid = false;
    }
    return {
        valid,
        errors,
    };
};
