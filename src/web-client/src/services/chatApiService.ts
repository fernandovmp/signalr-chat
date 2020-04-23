import User from '../models/User';
import ErrorModel from '../models/ErrorModel';
import Channel from '../models/Channel';
import Chat from '../models/Chat';

type Success = 'Success';

export interface IChatApiService {
    createUser(username: string): Promise<User | ErrorModel>;
    authenticate(username: string): Promise<User | ErrorModel>;
    getChannelsAsync(): Promise<Channel[]>;
    createChannelAsync(
        name: string,
        description: string,
        administratorId: string
    ): Promise<Channel | ErrorModel>;
    updateChannelName(
        channelId: string,
        name: string,
        administratorId: string
    ): Promise<Success | ErrorModel>;
    updateDescriptionName(
        channelId: string,
        administratorId: string,
        description?: string
    ): Promise<Success | ErrorModel>;
    getUserChats(user: User): Promise<Chat[]>;
    getChannel(channelId: string): Promise<Channel>;
    joinChannel(channel: Channel, user: User): Promise<Success | ErrorModel>;
    getChat(chatId: string, user: User): Promise<Chat>;
}

export class ChatApiService implements IChatApiService {
    private readonly baseUrl: string;
    constructor(url: string) {
        this.baseUrl = url;
    }
    async getChat(chatId: string, user: User): Promise<Chat> {
        const response = await fetch(`${this.baseUrl}/chats/${chatId}`, {
            headers: [['Authorization', user.id]],
        });
        return response.json();
    }
    async joinChannel(
        channel: Channel,
        user: User
    ): Promise<Success | ErrorModel> {
        const response = await fetch(`${this.baseUrl}/chats`, {
            method: 'POST',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', user.id],
            ],
            body: JSON.stringify({
                channelId: channel.id,
            }),
        });
        if (response.status !== 204) {
            return this.getErrors(response);
        }
        return 'Success';
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
    async createUser(username: string): Promise<User | ErrorModel> {
        const response = await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({
                username,
            }),
        });
        if (!response.ok) {
            return await this.getErrors(response);
        }
        return response.json();
    }
    async authenticate(username: string): Promise<User | ErrorModel> {
        const response = await fetch(`${this.baseUrl}/users/authenticate`, {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({
                username,
            }),
        });
        if (!response.ok) {
            return await this.getErrors(response);
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
    ): Promise<Success | ErrorModel> {
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
            return await this.getErrors(response);
        }
        return 'Success';
    }
    async updateDescriptionName(
        channelId: string,
        administratorId: string,
        description?: string
    ): Promise<Success | ErrorModel> {
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
            return await this.getErrors(response);
        }
        return 'Success';
    }
}
