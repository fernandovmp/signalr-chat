import { ErrorData } from '../models/ErrorData';
import { validationResult } from './validationResult';

export const validateChannelName = (name: string): validationResult => {
    let valid = true;
    const errors: ErrorData[] = [];
    if (name.trim() === '') {
        errors.push({
            property: 'Name',
            message: "Channel name can't be null or white spaces",
        });
        valid = false;
    }
    if (name.trim().length > 32) {
        errors.push({
            property: 'Name',
            message: 'Channel name should be at maximum 32 characters',
        });
        valid = false;
    }
    return {
        valid,
        errors,
    };
};

export const validateChannelDescription = (
    description: string
): validationResult => {
    let valid = true;
    const errors: ErrorData[] = [];
    if (description.length > 100) {
        errors.push({
            property: 'Description',
            message: 'Channel description should be at maximum 100 characters',
        });
        valid = false;
    }
    return {
        valid,
        errors,
    };
};
