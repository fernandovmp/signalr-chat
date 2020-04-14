import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { IChatApiService } from '../../services';
import User from '../../models/User';
import { getClassNames } from './styles';

type propsType = {
    chatApiService: IChatApiService;
};

const LoginPage: React.FC<propsType> = ({ chatApiService }) => {
    const [user, setUser] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [usernameInputValue, setUsernameInputValue] = useState<string>(
        user.username
    );
    const history = useHistory();
    const {
        loginForm,
        loginFormButton,
        loginFormInput,
        loginFormLabel,
    } = getClassNames();

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
            <label className={loginFormLabel}>
                Username
                <input
                    className={loginFormInput}
                    value={usernameInputValue}
                    onChange={(e) => setUsernameInputValue(e.target.value)}
                />
            </label>
            <button className={loginFormButton} type="submit">
                ENTRAR
            </button>
        </form>
    );
};

export default LoginPage;
