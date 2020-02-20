import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact={true}>
                <LoginPage />
            </Route>
        </BrowserRouter>
    );
}

export default App;
