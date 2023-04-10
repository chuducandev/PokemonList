export class SystemError<T> extends Error {
    httpStatus: number;

    status: number;

    backendJson: unknown;

    requestMessage: T | undefined;

    constructor(
        httpStatus = -1,
        status = -1,
        message = '',
        backendJson: unknown = undefined,
        requestMessage: T | undefined = undefined
    ) {
        super(message);

        Object.setPrototypeOf(this, SystemError.prototype);

        this.name = 'SystemError';
        this.message = message;

        this.httpStatus = httpStatus;
        this.status = status;

        this.backendJson = backendJson;
        this.requestMessage = requestMessage;
    }
}
