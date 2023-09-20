import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { createNewUser } from '../requests/api';
const LoginDialog = () => {
    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        const decoded = jwt_decode(res.credential);
        setAccount(decoded);
        await createNewUser(decoded);
    }

    const onLoginError = (res) => {
        console.log("Login failed");
        console.log(res);
    }
    return (
        <div>
            <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={onLoginError}
            />
        </div>
    )
}

export default LoginDialog