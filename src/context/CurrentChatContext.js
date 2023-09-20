import { createContext } from 'react';
import { useState } from 'react';
export const CurrentChatContext = createContext(null);


const CurrentChatProvider = ({ children }) => {
    const [current_chat, setCurrentChat] = useState(null);
    return (
        <CurrentChatContext.Provider value={{ current_chat, setCurrentChat }}>{children}</CurrentChatContext.Provider>
    );
}

export default CurrentChatProvider;