import React from 'react'
import { useContext } from 'react'

import { CurrentChatContext } from '../context/CurrentChatContext'
import ChatFooter from './ChatFooter'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import EmptyChat from './EmptyChat'
import ReplyProvider from "../context/ReplyProvider";
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
                <ReplyProvider>
                    <ChatHeader />
                    <Messages />
                    <ChatFooter />
                </ReplyProvider>
            </div>
        )
    }
}
export default ChatBox;