import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../models/User';
import { getLoginPageStyles } from './styles';
import { getCommonStyles } from '../../styles/commonStyles';
import { useChatApiService } from '../../hooks/useChatApiService';
import ErrorModel from '../../models/ErrorModel';
import { InputField, ErrorBox } from '../../components';

const LoginPage: React.FC = () => {
    const [user, setUser] = useLocalStorage<User>('user', {
        id: '',
        username: '',
    });
    const [usernameInputValue, setUsernameInputValue] = useState<string>(
        user.username
    );
    const [error, setError] = useState<ErrorModel>();
    const chatApiService = useChatApiService();
    const history = useHistory();
    const { formButton } = getCommonStyles();
    const { loginForm } = getLoginPageStyles();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (usernameInputValue.trim() === '') {
            setError({
                message: 'Invalid input',
                errors: [
                    {
                        property: 'Username',
                        message: "Username can't be white spaces",
                    },
                ],
            });
            return;
        }
        if (usernameInputValue.trim().length > 32) {
            setError({
                message: 'Invalid input',
                errors: [
                    {
                        property: 'Username',
                        message: 'Username should be at maximum 32 characters',
                    },
                ],
            });
            return;
        }
        let authenticatedUser: User;
        let response = await chatApiService.authenticate(usernameInputValue);
        if ((response as ErrorModel).message) {
            response = await chatApiService.createUser(usernameInputValue);
            if ((response as ErrorModel).message) {
                setError(response as ErrorModel);
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
            {error !== undefined && <ErrorBox message={error.message} />}
            <InputField
                fieldLabel="Username"
                onChange={setUsernameInputValue}
                value={usernameInputValue}
                errors={error?.errors
                    ?.filter(
                        (propertyError) => propertyError.property === 'Username'
                    )
                    .map((propertyError) => propertyError.message)}
            />
            <button className={formButton} type="submit">
                LOGIN
            </button>
        </form>
    );
};

export default LoginPage;
