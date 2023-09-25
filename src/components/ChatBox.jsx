import React from 'react'
import { useContext } from 'react'

import { CurrentChatContext } from '../context/CurrentChatContext'
import ChatFooter from './ChatFooter'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import EmptyChat from './EmptyChat'
const ChatBox = () => {
    const currentChatContext = useContext(CurrentChatContext);
    if (!currentChatContext.current_chat) {
        return (
            <EmptyChat />
        );
    }
    else {
        return (

            <div className="relative flex flex-col h-screen col-span-3">

                <ChatHeader />
                <Messages />
                <ChatFooter />
            </div>
        )
    }
}
export default ChatBox;