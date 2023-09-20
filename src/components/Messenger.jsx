import React from 'react'
import LoginDialog from './LoginDialog'
import ChatDialog from './ChatDialog'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider'
const Messenger = () => {
    const { account } = useContext(AccountContext);
    return (
        <div className="min-h-screen">
            {account ? <ChatDialog></ChatDialog> : <LoginDialog />}
        </div>
    )
}

export default Messenger