import User from '../models/User';
import ErrorModel from '../models/ErrorModel';
import Channel from '../models/Channel';

export interface IChatApiService {
    createUser(username: string): Promise<User>;
    authenticate(username: string): Promise<User>;
    getChannelsAsync(): Promise<Channel[]>;
    createChannelAsync(
        name: string,
        description: string,
        administratorId: string
    ): Promise<Channel>;
}

export class ChatApiService implements IChatApiService {
    private readonly baseUrl: string;
    constructor(url: string) {
        this.baseUrl = url;
    }
    async createChannelAsync(
        name: string,
        description: string,
        administratorId: string
    ): Promise<Channel> {
        const response = await fetch(`${this.baseUrl}/channels`, {
            method: 'POST',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', administratorId],
            ],
            body: JSON.stringify({
                name,
                description,
            }),
        });
        return response.json();
    }
    private async getErrors(response: Response): Promise<ErrorModel> {
        return response.json();
    }
    async createUser(username: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({
                username,
            }),
        });
        if (!response.ok) {
            const error = await this.getErrors(response);
            throw new Error(error.message);
        }
        return response.json();
    }
    async authenticate(username: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/authenticate`, {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({
                username,
            }),
        });
        if (!response.ok) {
            const error = await this.getErrors(response);
            throw new Error(error.message);
        }
        return response.json();
    }
    async getChannelsAsync(): Promise<Channel[]> {
        const response = await fetch(`${this.baseUrl}/channels`);
        return response.json();
    }
}
