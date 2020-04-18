import { IChatApiService, ChatApiService } from '../services';

const api = new ChatApiService('https://localhost:5001/api');

export function useChatApiService(): IChatApiService {
    return api;
}
