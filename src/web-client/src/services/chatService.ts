import * as signalR from '@microsoft/signalr';
import Message from '../models/Message';

export interface IChatService {
    readonly connection: signalR.HubConnection;
    joinChatAsync(username: string): Promise<void>;
    onUserJoined(action: (username: string) => void): void;
    onReceiveMessage(action: (message: Message) => void): void;
    sendMessageAsync(message: Message): Promise<void>;
}

export class ChatService implements IChatService {
    readonly connection: signalR.HubConnection;

    constructor(url: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            .build();
    }

    async joinChatAsync(username: string): Promise<void> {
        await this.connection.send('joinChat', username);
    }

    onUserJoined(action: (username: string) => void): void {
        this.connection.on('userJoined', action);
    }

    onReceiveMessage(action: (message: Message) => void): void {
        this.connection.on('receiveMessage', action);
    }

    async sendMessageAsync(message: Message): Promise<void> {
        await this.connection.send('sendMessage', message);
    }
}
