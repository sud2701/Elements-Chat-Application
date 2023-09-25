import React from 'react'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider'
import { useEffect } from 'react'
import { getMessages } from '../requests/api'
import { useState } from 'react'
import { CurrentChatContext } from '../context/CurrentChatContext'
import { ReplyContext } from '../context/ReplyProvider'
import ReplyProvider from '../context/ReplyProvider'
import { useRef } from 'react'


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
            const account_sub = accountContext.account.socketID;
            const current_sub = currentChatContext.current_chat.socketID;
            const res = await getMessages(account_sub, current_sub);
            if (res !== null) {
                setData(res);
                console.log(data);
            }
            else {
                setData([]);
            }
        }
        getData();
    }, [currentChatContext.current_chat, accountContext.account]);
    useEffect(() => {
        accountContext.socket.current.on('receive-message', (message) => {
            console.log("Received message: ", message);
            setIncomingMessage(message);
        });
    }, [accountContext.socket]);
    useEffect(() => {
        setData(prevData => [...prevData, incomingMessage]);
    }, [incomingMessage]);
    return (

        <div className="w-full h-full bg-white overflow-auto" id="messages">
            <div className="flex flex-col justify-end mx-5 my-4 overflow-y-auto">
                {data.length > 0 ? data.map((message) => {
                    if (message) {
                        if (message.sender === accountContext.account.socketID) {
                            return (

                                <MessageCard message={message.message} flag={0} key={message.message._id} />

                            );
                        }
                        else {
                            return (

                                <MessageCard message={message.message} flag={1} key={message.message._id} />

                            );
                        }
                    }


                }) : <div>No Messages sent so far</div>}
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
    let replyColor;

    if (flag === 0) {
        color = "bg-green-600";
        replyColor = "bg-green-300";
        justify = "justify-end";
    } else {
        color = "bg-blue-600";
        replyColor = "bg-blue-300";
        justify = "justify-start";
    }

    return (
        <div className={`flex ${justify} my-1 relative`}>
            {message.reply_to !== undefined && <div className={`${replyColor} text-gray-500 rounded-md relative my-0.5`}><p className="text-md absolute left-2 bottom-1">{message.reply_to.message.message}</p></div>}
            <div className={`rounded-md shadow-md ${color} text-white p-2 w-max flex flex-row items-center relative`}>
                {message.message}
                <svg
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 m-2 cursor-pointer"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                {showMenu && (
                    <div className={`absolute w-max bg-white shadow-lg rounded-lg border border-gray-200 top-8 z-50`}>
                        <div className="p-1">
                            <button
                                className="block w-full py-2 px-6 text-left hover:bg-gray-100 text-black"
                                onClick={() => {
                                    replyContext.setReplyTo(message);
                                    setShowMenu(false);
                                }}
                            >
                                Reply
                            </button>
                            <button
                                className="block w-full py-2 px-6 text-left hover:bg-gray-100 text-black"
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
        </div>
    );
};

export default Messages;