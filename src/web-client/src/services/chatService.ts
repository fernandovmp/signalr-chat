import * as signalR from '@microsoft/signalr';
import Message from '../models/Message';

export interface IChatService {
    readonly connection: signalR.HubConnection;
    joinChannelAsync(channelId: string, username: string): Promise<void>;
    leaveChannelAsync(channelId: string, username: string): Promise<void>;
    onUserJoined(action: (notification: string) => void): void;
    onUserLeft(action: (notification: string) => void): void;
    onReceiveMessage(action: (message: Message) => void): void;
    sendMessageAsync(message: Message): Promise<void>;
    disconect(): Promise<void>;
}

export class ChatService implements IChatService {
    readonly connection: signalR.HubConnection;

    constructor(url: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            .build();
    }
    async disconect(): Promise<void> {
        this.connection.off('userJoined');
        this.connection.off('receiveMessage');
        await this.connection.stop();
    }

    async joinChannelAsync(channelId: string, username: string): Promise<void> {
        await this.connection.send('joinChat', channelId, username);
    }

    async leaveChannelAsync(
        channelId: string,
        username: string
    ): Promise<void> {
        await this.connection.send('leaveChat', channelId, username);
    }

    onUserJoined(action: (notification: string) => void): void {
        this.connection.on('userJoined', (username) =>
            action(`${username} joined the chat`)
        );
    }

    onUserLeft(action: (notification: string) => void): void {
        this.connection.on('userLeave', (username) =>
            action(`${username} left the chat`)
        );
    }

    onReceiveMessage(action: (message: Message) => void): void {
        this.connection.on('receiveMessage', action);
    }

    async sendMessageAsync(message: Message): Promise<void> {
        await this.connection.send('sendMessage', message);
    }
}
