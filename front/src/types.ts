export interface IChannel {
    id: string;
    name: string;
}

export interface IUser {
    id: number;
    login: string;
    channels: IChannel[];
}

export enum ResponseType {
    SUCCESS = 'SUCCESS',
    ERRROR = 'ERROR'
}

export enum HTTPMethods {
    POST = "POST",
    GET = "GET",
    PATCH = "PATCH"
}

export type StorageType = 'localStorage' | 'sessionStorage'