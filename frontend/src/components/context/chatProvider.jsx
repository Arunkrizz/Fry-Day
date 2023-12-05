import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    return (
        <ChatContext.Provider value={{selectedChat, setSelectedChat, chats, setChats}}>
            {children}
        </ChatContext.Provider>
    )
}

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider