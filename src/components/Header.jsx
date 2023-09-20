import React from 'react'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider';
const Header = () => {
    const { account } = useContext(AccountContext);
    return (
        <div>
            <div className="flex flex-row items-center justify-evenly my-2">
                <img src={account.picture} alt="" className="rounded-full w-8 object-cover" />
                <h2 >{account.name}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <div className="px-3 py-2 flex flex-row bg-white rounded-lg m-2 align-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" className="w-fit" />
                </svg>
                <input type="text" placeholder="Search for a user" className="w-full h-6 self-center ml-4 text-black cursor-text justify-center border border-transparent" />
            </div>
        </div>


    )
}

export default Header