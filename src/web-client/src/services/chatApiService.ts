import User from '../models/User';

export interface IChatApiService {
    createUser(username: string): Promise<User>;
    authenticate(username: string): Promise<User>;
}

export class ChatApiService implements IChatApiService {
    private readonly baseUrl: string;
    constructor(url: string) {
        this.baseUrl = url;
    }
    async createUser(username: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({
                username
            })
        });
        return response.json();
    }
    async authenticate(username: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/authenticate`, {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({
                username
            })
        });
        return response.json();
    }
}
