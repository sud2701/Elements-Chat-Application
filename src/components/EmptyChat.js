import React from "react";
const EmptyChat = () => {
    return (
        <div className="flex align-center justify-center relative h-full col-span-3 bg-gradient-to-br from-[#20222e] to-black text-white">
            <div className="fixed inset-y-1/2 flex flex-col items-center">
                <h2 className="font-bold">No Chats to Show.</h2>
                <p className="text-md">When you chat with a person, the messages will appear here.</p>
            </div>
        </div>
    )
}

export default EmptyChat;