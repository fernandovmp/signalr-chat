import { IChatService, ChatService } from '../services';
import { useState } from 'react';

export function useChatService(): IChatService {
    const [chat] = useState(new ChatService('https://localhost:5001/chatHub'));
    return chat;
}
