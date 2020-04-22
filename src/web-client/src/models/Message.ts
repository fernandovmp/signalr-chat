import User from './User';

export default interface Message {
    channelId: string;
    sender: User;
    content: string;
    date: Date;
}
