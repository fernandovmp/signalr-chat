import { ErrorData } from './ErrorData';

export default interface ErrorModel {
    message: string;
    errors?: ErrorData[];
}
