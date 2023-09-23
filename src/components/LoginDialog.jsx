import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { createNewUser } from '../requests/api';
import { useSpring, animated } from 'react-spring';

const LoginDialog = () => {
    const { setAccount, socket } = useContext(AccountContext);
    const [animatedProps, set] = useSpring(() => ({ opacity: 1, transform: 'translateY(0)' }));
    const [isButtonVisible, setButtonVisibility] = useState(true);

    const onLoginSuccess = async (res) => {
        const decoded = jwt_decode(res.credential);
        setAccount(decoded);
        socket.current.emit('setSocketId', decoded.sub);
        await createNewUser(decoded);
    }

    const onLoginError = (res) => {
        console.log("Login failed");
        console.log(res);
    }


    return (
        <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
            <header className="text-4xl font-semibold mb-8">Welcome to Elements</header>
            <p className="text-lg text-gray-400 mb-8">A chat application that connects you with the world.</p>

            {/* Animated Login Button */}
            {isButtonVisible && (

                <GoogleLogin
                    onSuccess={onLoginSuccess}
                    onError={onLoginError}
                    // Customize the button using Tailwind CSS
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-transform transform hover:scale-105 m-3"
                />

            )}

            {/* Features */}
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="text-lg text-gray-400">
                    <li className="mb-2">Real-time Chat</li>
                    <li className="mb-2">Group Chats</li>
                    <li className="mb-2">Secure & Private</li>
                    <li className="mb-2">Cross-Platform</li>
                </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-8">
                <p className="text-lg text-gray-400 mb-2">Ready to start chatting?</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full">
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default LoginDialog;
