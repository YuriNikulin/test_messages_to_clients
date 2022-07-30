export interface Channel {
    id: string;
    name: string;
}

export interface IUser {
    id: number;
    login: string;
    channels: Channel[];
}