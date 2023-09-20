import React from 'react'
import ChatBox from './ChatBox'
import { useState, useEffect } from 'react';
import Header from './Header';
import { getUsers } from '../requests/api';
import Users from './Users';
const ChatDialog = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                let res = await getUsers();
                setUsers(res);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchData(); // Call the fetchData function
    }, []);
    return (
        <div className="grid grid-cols-4 h-screen overflow-y-hidden">
            <div className="h-full col-span-1 bg-black text-white">
                <Header />
                <Users users={users} />
            </div>
            <ChatBox />
        </div>
    )
}

export default ChatDialog