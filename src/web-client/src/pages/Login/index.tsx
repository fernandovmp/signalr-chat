import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { getLoginPageStyles } from './styles';
import { getCommonStyles } from '../../styles/commonStyles';
import { useChatApiService } from '../../hooks/useChatApiService';
import ErrorModel from '../../models/ErrorModel';

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
        let response = await chatApiService.authenticate(usernameInputValue);
        if (response as ErrorModel) {
            response = await chatApiService.createUser(usernameInputValue);
            if (response as ErrorModel) {
                return;
            }
            authenticatedUser = response as User;
        } else {
            authenticatedUser = response as User;
        }
        setUser(authenticatedUser);
        //Wait for useEffect/ComponentDidMount call of useLocalStorage
        setTimeout(() => history.push('/explore'), 10);
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
