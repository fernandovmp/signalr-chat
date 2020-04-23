interface ErrorData {
    property: string;
    message: string;
}

export default interface ErrorModel {
    message: string;
    errors?: ErrorData[];
}
