export enum ResponseStatus {
    OK,
    MissingAttributes,
    AuthFail,

}

export interface FormattedResponse {
    status: ResponseStatus;
    titleMessage: string;
    message?: string;
}