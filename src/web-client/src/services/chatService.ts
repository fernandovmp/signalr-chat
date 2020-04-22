import * as signalR from '@microsoft/signalr';
import Message from '../models/Message';
import { Queue } from '../utils/Queue';

export interface IChatService {
    joinChannel(channelId: string, username: string): void;
    leaveChannel(channelId: string, username: string): void;
    onUserJoined(action: (notification: string) => void): void;
    onUserLeft(action: (notification: string) => void): void;
    onReceiveMessage(action: (message: Message) => void): void;
    sendMessage(message: Message): void;
    disconect(): Promise<void>;
}

type EventType = {
    method: string;
    args: any[];
};

export class ChatService implements IChatService {
    readonly connection: signalR.HubConnection;
    private readonly eventQueue: Queue<EventType>;

    constructor(url: string) {
        this.eventQueue = new Queue<EventType>(() => {
            this.processEventQueue();
        });
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .build();
        this.connection.onreconnected((connectionId) => {
            this.processEventQueue();
        });
        this.connect();
    }

    async connect(): Promise<void> {
        await this.connection.start();
        this.processEventQueue();
    }

    async disconect(): Promise<void> {
        this.connection.off('userJoined');
        this.connection.off('userLeave');
        this.connection.off('receiveMessage');
        await this.connection.stop();
    }

    private async processEventQueue() {
        while (
            !this.eventQueue.empty() &&
            this.connection.state === signalR.HubConnectionState.Connected
        ) {
            const event = this.eventQueue.popFront();
            if (event !== undefined) {
                await this.connection.send(event.method, ...event.args);
            }
        }
    }

    joinChannel(channelId: string, username: string): void {
        this.eventQueue.pushBack({
            method: 'joinChat',
            args: [channelId, username],
        });
    }

    leaveChannel(channelId: string, username: string): void {
        this.eventQueue.pushBack({
            method: 'leaveChat',
            args: [channelId, username],
        });
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

    sendMessage(message: Message): void {
        this.eventQueue.pushBack({
            method: 'sendMessage',
            args: [message],
        });
    }
}
