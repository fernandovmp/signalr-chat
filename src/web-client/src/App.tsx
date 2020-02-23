import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChatPage from './pages/Chat';

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact={true}>
                <LoginPage />
            </Route>
            <Route path="/chat" exact={true}>
                <ChatPage />
            </Route>
        </BrowserRouter>
    );
}

export default App;
