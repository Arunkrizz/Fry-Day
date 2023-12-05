import { ChatState } from "../../components/context/chatProvider"
import { ChakraProvider } from "@chakra-ui/react"
import { useState } from "react"
import { Box } from "@chakra-ui/layout"
// import ChatSideDrawer from "../../components/userComponents/ChatSideDrawer"
import ChatList from "../../components/UserComponents/ChatList"
import ChatBox from "../../components/UserComponents/ChatBox"

const ChatScreen = () => {
    const [fetchAgain,setFetchAgain] = useState(false)
    return (
       
            <div style={{width: "100%"}}>
                {/* <ChatSideDrawer /> */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    height="91.5vh"
                    padding="10px"
                >
                    <ChatList fetchAgain={fetchAgain} />
                    <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                </Box>
            </div>
        
    )
}

export default ChatScreen