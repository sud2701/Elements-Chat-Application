import { createContext } from "react";
import { useState } from "react";
export const ReplyContext = createContext(null);

const ReplyProvider = ({ children }) => {
    const [reply_to, setReplyTo] = useState();
    return (
        <ReplyContext.Provider
            value={{
                reply_to, setReplyTo
            }}
        >{children}</ReplyContext.Provider>
    );
}

export default ReplyProvider;