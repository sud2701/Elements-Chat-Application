import React from 'react'
import { useContext } from 'react'
import { CurrentChatContext } from '../context/CurrentChatContext'
const ChatHeader = () => {
    const currentChatContext = useContext(CurrentChatContext);
    let status = "Offline";
    if (!currentChatContext.current_chat) {
        return <div>Loading...</div>;
    }
    const { name, profile_image } = currentChatContext.current_chat;
    return (
        <div className="flex items-center sticky w-full bg-gray-800 top-0 h-14 text-white">
            <img className="rounded-full h-8 w-8 m-2 object-cover" src={profile_image} alt={`${name}'s profile`}></img>
            <div className="flex flex-col ml-2">
                <h4>{name}</h4>
                <p className="text-xs text-gray-600">{status}</p>
            </div>
            <div className="flex flex-row ml-auto mr-3">
                <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <svg className="w-6 h-6 mx-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" stroke="#FFFFFF"><path d="M19 16a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm0 13a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm0-26a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3z" fill="#373737"></path></svg>
            </div>
        </div>
    );
}

export default ChatHeader;