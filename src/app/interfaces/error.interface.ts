export interface Error {
    error: string;
    message: string | string[];
    statusCode: number;
}

export interface HttpError {
    error: Error;
    [key: string]: any;
}
