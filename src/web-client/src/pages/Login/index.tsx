import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import './styles.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useLocalStorage<string>('username', '');
    const [usernameInputValue, setUsernameInputValue] = useState<string>(
        username
    );
    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(usernameInputValue);
        //Wait for useEffect/ComponentDidMount call of useLocalStorage
        setTimeout(() => history.push('/chat'), 10);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label>
                Username
                <input
                    value={usernameInputValue}
                    onChange={e => setUsernameInputValue(e.target.value)}
                />
            </label>
            <button type="submit">ENTRAR</button>
        </form>
    );
};

export default LoginPage;
