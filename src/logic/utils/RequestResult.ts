export enum RequestStatus {
    NOT_INIT='Not initialized',
    SUCCESS = 'Success',
    FAIL = 'Fail',
    IN_PROGRESS = 'In progress'
}

export interface RequestResult {
    status: RequestStatus;
    titleMessage?: string;
    message?: string;
}

export const notInitialized = (): RequestResult => {
    return {
        status: RequestStatus.NOT_INIT
    };
}

export class BasicRequestResult implements RequestResult {
    status: RequestStatus;
    titleMessage?: string;
    message?: string;

    constructor(status: RequestStatus, titleMessage?: string, message?: string) {
        this.message = message;
        this.status = status;
        this.titleMessage = titleMessage;
    }
}