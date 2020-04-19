import User from '../models/User';
import ErrorModel from '../models/ErrorModel';
import Channel from '../models/Channel';
import Chat from '../models/Chat';

export interface IChatApiService {
    createUser(username: string): Promise<User>;
    authenticate(username: string): Promise<User>;
    getChannelsAsync(): Promise<Channel[]>;
    createChannelAsync(
        name: string,
        description: string,
        administratorId: string
    ): Promise<Channel>;
    updateChannelName(
        channelId: string,
        name: string,
        administratorId: string
    ): Promise<void>;
    updateDescriptionName(
        channelId: string,
        administratorId: string,
        description?: string
    ): Promise<void>;
    getUserChats(user: User): Promise<Chat[]>;
    getChannel(channelId: string): Promise<Channel>;
    joinChannel(channel: Channel, user: User): Promise<void>;
}

export class ChatApiService implements IChatApiService {
    private readonly baseUrl: string;
    constructor(url: string) {
        this.baseUrl = url;
    }
    async joinChannel(channel: Channel, user: User): Promise<void> {
        await fetch(`${this.baseUrl}/chats`, {
            method: 'POST',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', user.id],
            ],
            body: JSON.stringify({
                channelId: channel.id,
            }),
        });
    }
    async getChannel(channelId: string): Promise<Channel> {
        const response = await fetch(`${this.baseUrl}/channels/${channelId}`);
        return response.json();
    }
    async getUserChats(user: User): Promise<Chat[]> {
        const response = await fetch(`${this.baseUrl}/chats`, {
            headers: [['Authorization', user.id]],
        });
        return response.json();
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
    async updateChannelName(
        channelId: string,
        name: string,
        administratorId: string
    ): Promise<void> {
        const response = await fetch(
            `${this.baseUrl}/channels/${channelId}/name`,
            {
                method: 'PUT',
                headers: [
                    ['Content-Type', 'application/json'],
                    ['Authorization', administratorId],
                ],
                body: JSON.stringify({
                    name,
                }),
            }
        );
        if (response.status !== 204) {
            const error = await this.getErrors(response);
            throw new Error(error.message);
        }
    }
    async updateDescriptionName(
        channelId: string,
        administratorId: string,
        description?: string
    ): Promise<void> {
        const response = await fetch(
            `${this.baseUrl}/channels/${channelId}/description`,
            {
                method: 'PUT',
                headers: [
                    ['Content-Type', 'application/json'],
                    ['Authorization', administratorId],
                ],
                body: JSON.stringify({
                    description,
                }),
            }
        );
        if (response.status !== 204) {
            const error = await this.getErrors(response);
            throw new Error(error.message);
        }
    }
}
