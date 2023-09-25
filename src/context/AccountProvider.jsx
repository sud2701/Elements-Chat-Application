import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();
    const socket = useRef();
    const [activeUsers, setActiveUsers] = useState([]);
    useEffect(() => {
        if (account !== undefined) {
            socket.current = io('http://localhost:4000', { transports: ['websocket'], query: { id: account.socketID } });
            socket.current.on('connect', () => {
                console.log('Connected to the server');

            })
            socket.current.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });
        }

    }, [account]);
    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            activeUsers,
            setActiveUsers,
            socket,
        }}>
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;