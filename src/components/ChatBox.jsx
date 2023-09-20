import React from 'react'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider'
import { useEffect } from 'react'
import { getMessages, sendMessage } from '../requests/api'
import { useState } from 'react'
import { CurrentChatContext } from '../context/CurrentChatContext'
import { uploadFile } from '../requests/api'
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

export const ChatHeader = () => {
    const currentChatContext = useContext(CurrentChatContext);
    if (!currentChatContext.current_chat) {
        return <div>Loading...</div>;
    }
    const { name, profile_image } = currentChatContext.current_chat;
    return (
        <div className="flex items-center sticky w-full bg-gray-800 top-0 h-14 text-white">
            <img className="rounded-full h-8 w-8 m-2 object-cover" src={profile_image} alt={`${name}'s profile`}></img>
            <div className="flex flex-col ml-2">
                <h4>{name}</h4>
                <p className="text-xs text-gray-600">Online</p>
            </div>
            <div className="flex flex-row ml-auto mr-3">
                <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <svg className="w-6 h-6 mx-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" stroke="#FFFFFF"><path d="M19 16a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm0 13a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm0-26a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3z" fill="#373737"></path></svg>
            </div>
        </div>
    );
}

export const ChatFooter = () => {
    const currentChatContext = useContext(CurrentChatContext);
    const accountContext = useContext(AccountContext);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const [filename, setFileName] = useState();
    const onFileChange = (e) => {
        console.log(e);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    useEffect(() => {
        const setImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                await uploadFile(data);
            }
        }
        setImage();
    }, [file]);

    return (
        <div className="sticky flex flex-row items-center w-full bottom-0 h-14 bg-black">
            <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="#FFFFFF"></path> <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" fill="#FFFFFF"></path> <path d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z" fill="#FFFFFF"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" fill="#FFFFFF"></path> </g></svg>\
            <label htmlFor='fileInput'>
                <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

            </label>
            <input type="file" id="fileInput" className="hidden" onChange={(e) => onFileChange(e)} />
            <input
                type="text"
                name="message"
                className="bg-gray-700 text-white rounded-md border border-black justify-center w-full h-10 px-3"
                value={message}
                placeholder="Type a message"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        console.log('Enter key pressed');
                        sendMessage(accountContext.account.sub, currentChatContext.current_chat.sub, message);
                        setMessage("");
                    } else {
                        setMessage(e.target.value);
                    }
                }}
            />

            <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
    );
}

export const Messages = () => {
    const currentChatContext = useContext(CurrentChatContext);
    const accountContext = useContext(AccountContext);
    const [data, setData] = useState(null);
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
        }
        getData();
    }, [currentChatContext, accountContext.account]);
    return (
        <div className="w-full h-full bg-white">
            <div className="flex flex-col justify-end mx-5 my-4">
                {data !== null ? data.map((message) => {
                    if (message.sender === accountContext.account.sub) {
                        return (
                            <MessageCard text={message.message} flag={0} key={message._id} />
                        );
                    }
                    else {
                        return (
                            <MessageCard text={message.message} flag={1} key={message._id} />
                        );
                    }

                }) : <div>No Messages sent so far</div>}
            </div>
        </div>
    );
}

export const MessageCard = (props) => {
    const { text, flag } = props;
    let color;
    let justify;

    if (flag === 0) {
        color = "bg-green-600";
        justify = "justify-end";
    }
    else {
        color = "bg-blue-600";
        justify = "justify-start";
    }
    return (
        <div className={`flex ${justify} my-1`}>
            <div className={`rounded-md shadow-md ${color} text-white p-2 w-max flex-item`}>{text}</div>
        </div>
    );

}

export const EmptyChat = () => {
    return (
        <div className="flex align-center justify-center relative h-full col-span-3 bg-gradient-to-br from-[#20222e] to-black text-white">
            <div className="fixed inset-y-1/2 flex flex-col items-center">
                <h2 className="font-bold">No Chats to Show.</h2>
                <p className="text-md">When you chat with a person, the messages will appear here.</p>
            </div>
        </div>
    )
}



export default ChatBox;