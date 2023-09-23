import React from 'react'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider'
import { useEffect } from 'react'
import { getMessages } from '../requests/api'
import { useState } from 'react'
import { CurrentChatContext } from '../context/CurrentChatContext'
import { ReplyContext } from '../context/ReplyProvider'
import ReplyProvider from '../context/ReplyProvider'
const Messages = () => {
    const currentChatContext = useContext(CurrentChatContext);
    const accountContext = useContext(AccountContext);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            if (!accountContext.account || !currentChatContext.current_chat) {
                return;
            }
            const account_sub = accountContext.account.sub;
            const current_sub = currentChatContext.current_chat.sub;
            const res = await getMessages(account_sub, current_sub);
            if (res !== null) {
                setData(res);
            }
            else {
                setData([]);
            }
        }
        getData();
    }, [currentChatContext.current_chat, accountContext.account]);
    useEffect(() => {
        accountContext.socket.current.on('receive-message', (message) => {
            setIncomingMessage(message);
        });
    })
    useEffect(() => {
        setData(data.push(incomingMessage));
    }, [incomingMessage]);
    return (

        <div className="w-full h-full bg-white overflow-auto">
            <div className="flex flex-col justify-end mx-5 my-4 overflow-y-auto">
                <ReplyProvider>
                    {data.length > 0 ? data.map((message) => {
                        if (message.sender === accountContext.account.sub) {
                            return (

                                <MessageCard message={message.message} flag={0} key={message.message._id} />

                            );
                        }
                        else {
                            return (

                                <MessageCard message={message.message} flag={1} key={message.message._id} />

                            );
                        }

                    }) : <div>No Messages sent so far</div>}
                </ReplyProvider>
            </div>
        </div>

    );
}

export const MessageCard = (props) => {
    const replyContext = useContext(ReplyContext);
    const { message, flag } = props;
    const [showMenu, setShowMenu] = useState(false);
    let color;
    let justify;
    let direction;
    if (flag === 0) {
        color = "bg-green-600";
        justify = "justify-end";
        direction = "right-5"
    }
    else {
        color = "bg-blue-600";
        justify = "justify-start";
        direction = "left-5";
    }
    return (
        <div className={`flex ${justify}  my-1`}>
            <div className={`rounded-md shadow-md ${color} text-white p-2 w-max flex flex-row items-center`}>
                {message.message}
                <svg onClick={() => { setShowMenu(!showMenu); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 m-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            {showMenu && (
                <div className={`absolute ${direction} mt-2 w-max bg-white shadow-lg rounded-lg border border-gray-200`}>
                    <div className="p-1">
                        <button
                            className="block w-full py-2 px-6 text-left hover:bg-gray-100"
                            onClick={() => {
                                console.log("ReplyContext.reply_to (before setting):", replyContext.reply_to);

                                // Inside your onClick handler
                                replyContext.setReplyTo(message);
                                console.log("Setting ReplyContext.reply_to:", message);
                                console.log("ReplyContext.reply_to (after setting):", replyContext.reply_to);
                                setShowMenu(false);
                            }}
                        >
                            Reply
                        </button>
                        <button
                            className="block w-full py-2 px-6 text-left hover:bg-gray-100"
                            onClick={() => {
                                // Handle reaction option here
                                setShowMenu(false);
                            }}
                        >
                            Reaction
                        </button>
                    </div>
                </div>
            )}

        </div>
    );

}

export default Messages;