import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChatPage from './pages/Chat';
import { ChatService } from './services/chatService';

const chatService = new ChatService('https://localhost:5001/chatHub');

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact={true}>
                <LoginPage />
            </Route>
            <Route path="/chat" exact={true}>
                <ChatPage chatService={chatService} />
            </Route>
        </BrowserRouter>
    );
}

export default App;
