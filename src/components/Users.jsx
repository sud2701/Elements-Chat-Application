import React from 'react'
import { useContext } from 'react';
import { CurrentChatContext } from '../context/CurrentChatContext';
import { AccountContext } from '../context/AccountProvider';
const Users = ({ users }) => {
    const accountContext = useContext(AccountContext);
    const currentChatContext = useContext(CurrentChatContext);
    return (
        <div>
            <div className="flex flex-col h-full">
                {users.filter((user) => user.sub !== accountContext.account.sub).map((user) => (
                    <div key={user.sub} className="flex flex-row items-center justify-center w-fit m-4 h-10 cursor-pointer" onClick={() => {
                        currentChatContext.setCurrentChat(user);
                    }}>
                        <img src={user.profile_image} alt="" className="rounded-full w-8 mr-6 ml-3 h-8 object-cover" />
                        <h4 className="self-start">{user.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users