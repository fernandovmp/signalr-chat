import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { getLoginPageStyles } from './styles';
import { getCommonStyles } from '../../styles/commonStyles';
import { useChatApiService } from '../../hooks/useChatApiService';

const LoginPage: React.FC = () => {
    const [user, setUser] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [usernameInputValue, setUsernameInputValue] = useState<string>(
        user.username
    );
    const chatApiService = useChatApiService();
    const history = useHistory();
    const { formButton, formInput, formLabel } = getCommonStyles();
    const { loginForm } = getLoginPageStyles();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (usernameInputValue.trim() === '') return;
        let authenticatedUser: User;
        try {
            authenticatedUser = await chatApiService.authenticate(
                usernameInputValue
            );
        } catch (error) {
            try {
                authenticatedUser = await chatApiService.createUser(
                    usernameInputValue
                );
            } catch (error) {
                console.error(error);
                return;
            }
        }
        setUser(authenticatedUser);
        //Wait for useEffect/ComponentDidMount call of useLocalStorage
        setTimeout(() => history.push('/chat'), 10);
    };

    return (
        <form className={loginForm} onSubmit={handleSubmit}>
            <label className={formLabel}>
                Username
                <input
                    className={formInput}
                    value={usernameInputValue}
                    onChange={(e) => setUsernameInputValue(e.target.value)}
                />
            </label>
            <button className={formButton} type="submit">
                LOGIN
            </button>
        </form>
    );
};

export default LoginPage;
