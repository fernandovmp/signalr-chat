import { ErrorData } from '../models/ErrorData';

export type validationResult = {
    valid: boolean;
    errors: ErrorData[];
};
