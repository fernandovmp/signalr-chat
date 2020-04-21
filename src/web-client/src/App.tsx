import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import { ChatApiService, ChatService } from './services';
import PageTemplate from './pages/PageTemplate';
import { routes } from './routes';

const chatApiService = new ChatApiService('https://localhost:5001/api');

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true}>
                    <LoginPage chatApiService={chatApiService} />
                </Route>
                <Route path="/">
                    <PageTemplate routes={routes} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
